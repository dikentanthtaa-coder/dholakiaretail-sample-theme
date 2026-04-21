import { useCallback, useEffect, useRef } from "react";

interface ParticleTextProps {
    text: string;
    fontSize?: number;
    className?: string;
    height?: number;
    fontFamily?: string;
    fontWeight?: number;
    fontStyle?: string;
}

interface Particle {
    x: number;
    y: number;
    tx: number;
    ty: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    color: string;
}

export function ParticleText({
    text,
    fontSize = 0.7,
    className = "",
    height = 110,
    fontFamily = "serif",
    fontWeight = 700,
    fontStyle = "normal",
}: ParticleTextProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -999, y: -999 });
    const animationRef = useRef<number | null>(null);
    const observerRef = useRef<ResizeObserver | null>(null);

    const createParticles = useCallback(
        (canvasWidth: number, canvasHeight: number, dpr: number) => {
            const offscreen = document.createElement("canvas");
            offscreen.width = canvasWidth;
            offscreen.height = canvasHeight;
            const ctx = offscreen.getContext("2d");
            if (!ctx) {
                particlesRef.current = [];
                return;
            }

            const baseSize = Math.max(32, Math.round(120 * fontSize));
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = `${fontStyle} ${fontWeight} ${baseSize}px ${fontFamily}`;
            
            ctx.fillStyle = "#fff";
            ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

            const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            const data = imageData.data;
            const gap = window.innerWidth < 768 ? 5 : 3;
            const sampled: Particle[] = [];

            for (let y = 0; y < canvasHeight; y += gap) {
                for (let x = 0; x < canvasWidth; x += gap) {
                    const index = (y * canvasWidth + x) * 4;
                    if (data[index] > 200) {
                        sampled.push({
                            x: Math.random() * canvasWidth,
                            y: Math.random() * canvasHeight,
                            tx: x,
                            ty: y,
                            vx: 0,
                            vy: 0,
                            size: 0.8 + Math.random() * 1.4,
                            alpha: 0.6 + Math.random() * 0.4,
                            color: "#fff",
                        });
                    }
                }
            }

            if (sampled.length > 4000) {
                const reduced: Particle[] = [];
                const step = Math.ceil(sampled.length / 4000);
                for (let i = 0; i < sampled.length; i += step) {
                    reduced.push(sampled[i]);
                }
                particlesRef.current = reduced;
            } else {
                particlesRef.current = sampled;
            }
        },
        [fontSize, text, fontFamily, fontWeight, fontStyle]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) {
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            const displayWidth = Math.max(100, Math.floor(rect.width));
            const displayHeight = height;
            canvas.style.width = `${displayWidth}px`;
            canvas.style.height = `${displayHeight}px`;
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
            createParticles(canvas.width, canvas.height, dpr);
        };

        const drawFrame = () => {
            const width = canvas.width;
            const heightPx = canvas.height;
            ctx.clearRect(0, 0, width, heightPx);

            const particles = particlesRef.current;
            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            for (let i = 0; i < particles.length; i += 1) {
                const particle = particles[i];
                const dx = particle.tx - particle.x;
                const dy = particle.ty - particle.y;
                particle.vx += dx * 0.07;
                particle.vy += dy * 0.07;

                const deltaX = particle.x - mouseX;
                const deltaY = particle.y - mouseY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < 90) {
                    const force = ((90 - distance) / 90) * 6;
                    if (distance > 0.1) {
                        particle.vx += (deltaX / distance) * force;
                        particle.vy += (deltaY / distance) * force;
                    }
                }

                particle.vx *= 0.8;
                particle.vy *= 0.8;
                particle.x += particle.vx;
                particle.y += particle.vy;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.alpha;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            animationRef.current = window.requestAnimationFrame(drawFrame);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) * dpr;
            const y = (event.clientY - rect.top) * dpr;
            mouseRef.current.x = x;
            mouseRef.current.y = y;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = -999;
            mouseRef.current.y = -999;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        const observer = new ResizeObserver(() => {
            resizeCanvas();
        });
        observer.observe(container);
        observerRef.current = observer;

        resizeCanvas();
        animationRef.current = window.requestAnimationFrame(drawFrame);

        return () => {
            if (animationRef.current !== null) {
                window.cancelAnimationFrame(animationRef.current);
            }
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [createParticles, height]);

    return (
        <div ref={containerRef} className={className}>
            <canvas ref={canvasRef} className="block w-full cursor-none" />
        </div>
    );
}
