import AudioVisualPage from "../portfolio/AudioVisualPage";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
  if (process.env.ENABLE_AUDIOVISUAL !== "true") {
    notFound();
  }

  return <AudioVisualPage />;
}
