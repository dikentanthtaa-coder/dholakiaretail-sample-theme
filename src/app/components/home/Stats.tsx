import { SectionFrame } from "../editorial/SectionFrame";
import { MetricStrip } from "../editorial/MetricStrip";
import { stats } from "./constants";

export function StatsSection() {
  return (
    <SectionFrame tone="canvas" divider="bottom">
      <MetricStrip
        metrics={stats.map((item) => ({
          value: item.value,
          label: item.label
        }))}
      />
    </SectionFrame>
  );
}
