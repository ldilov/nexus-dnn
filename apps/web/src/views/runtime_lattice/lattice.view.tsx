import { useParams } from "react-router";
import { Block, blockMnemonic } from "../../components/blocks/block";
import { LatticeView, latticeRunId } from "../../components/runtime/model_load_lattice/lattice.view";
import { PageHero } from "../../components/base/page_hero";

const LATTICE_MNEMONIC = blockMnemonic("LLMA");

export function RuntimeLatticeRoute() {
  const { runId: runIdParam } = useParams<{ runId: string }>();
  const runId = latticeRunId(runIdParam ?? "smoke-run");
  const promptHeader = `$ load ${runIdParam ?? "smoke-run"} --layers (auto)`;

  return (
    <div>
      <PageHero
        eyebrow="Runtime · Model load lattice"
        title="Lattice"
        lede="Per-layer × per-group residency map for the active model load. Press 1-4 to traverse the Ladder of Abstraction."
      />
      <Block id={runId} mnemonic={LATTICE_MNEMONIC} promptHeader={promptHeader}>
        <LatticeView runId={runId} />
      </Block>
    </div>
  );
}
