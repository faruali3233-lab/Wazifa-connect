import { AgentProfileForm } from "@/components/agent-profile-form";

export default function AgentProfilePage() {
  return (
    <div className="flex items-start justify-center py-12">
        <div className="w-full max-w-5xl px-4">
             <AgentProfileForm />
        </div>
    </div>
  );
}
