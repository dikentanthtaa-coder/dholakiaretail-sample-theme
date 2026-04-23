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
    fontFamily = "Syne",
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

            // Calculate responsive font size based on viewport width and base fontSize
            const viewportWidth = window.innerWidth;
            let responsiveFontSize;

            if (viewportWidth < 768) {
                responsiveFontSize = fontSize * 1;  // Increased for tablet
            } else if (viewportWidth < 1024) {
                responsiveFontSize = fontSize * 1;  // Increased for laptop
            } else {
                responsiveFontSize = fontSize * 1.3;  // Increased for large screens
            }

            // Calculate base size with better scaling and increased maximum for large screens
            const baseSize = Math.max(48, Math.min(160, Math.round((120 * responsiveFontSize * viewportWidth) / 1920)));
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = `${fontStyle} ${fontWeight} ${baseSize}px ${fontFamily}`;

            // Measure text width to ensure full text fits
            const textWidth = ctx.measureText(text).width;
            const padding = baseSize * 0.3; // 30% padding on each side

            ctx.fillStyle = "#fff";
            ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

            const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            const data = imageData.data;
            // Responsive gap based on viewport width
            let gap;
            if (viewportWidth < 1024) {
                gap = 4;
            } else {
                gap = 3;
            }
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
            const viewportWidth = window.innerWidth;

            // Calculate responsive width based on viewport - make it full screen
            let displayWidth;
            if (viewportWidth < 425) {
                displayWidth = Math.max(320, Math.floor(viewportWidth * 0.95));
            } else if (viewportWidth < 768) {
                displayWidth = Math.max(500, Math.floor(viewportWidth * 0.85));
            } else if (viewportWidth < 1024) {
                displayWidth = Math.max(700, Math.floor(viewportWidth * 0.85));
            } else {
                displayWidth = Math.max(900, Math.floor(viewportWidth * 0.75));
            }

            // Reduce Y-axis padding for mobile screens only
            let displayHeight = height;
            if (viewportWidth < 425) {
                displayHeight = height * 0.6; // Reduce vertical padding for mobile
            }
            canvas.style.width = `${displayWidth}px`;
            canvas.style.height = `${displayHeight}px`;
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;

            // Wait for fonts to load before creating particles
            document.fonts.ready.then(() => {
                createParticles(canvas.width, canvas.height, dpr);
            });
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

                const deltaX = particle.x - mouseX;
                const deltaY = particle.y - mouseY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // Attract particles towards cursor when nearby
                if (distance < 120) {
                    const force = ((120 - distance) / 120) * 2.5;
                    if (distance > 0.1) {
                        // Move particles towards cursor
                        particle.vx -= (deltaX / distance) * force;
                        particle.vy -= (deltaY / distance) * force;
                    }
                }

                // Always pull particles back to their original positions
                particle.vx += dx * 0.02;
                particle.vy += dy * 0.02;

                // Apply friction for smooth movement
                particle.vx *= 0.92;
                particle.vy *= 0.92;
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
