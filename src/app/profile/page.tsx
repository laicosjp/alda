import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import Header from "../_components/core/Header";

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/api/auth/signin");
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold text-white mb-8">Profile</h1>
					
					<div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
						<div className="space-y-4">
							<div className="border-b border-white/20 pb-4">
								<h2 className="text-xl font-semibold text-white/70 mb-2">User Information</h2>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<span className="text-white/60">Name:</span>
										<span className="text-white font-medium">{session.user.name || "Not set"}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-white/60">Email:</span>
										<span className="text-white font-medium">{session.user.email || "Not set"}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-white/60">User ID:</span>
										<span className="text-white font-mono text-sm">{session.user.id}</span>
									</div>
								</div>
							</div>

							{session.user.image && (
								<div className="border-b border-white/20 pb-4">
									<h2 className="text-xl font-semibold text-white/70 mb-2">Profile Picture</h2>
									<img
										src={session.user.image}
										alt="Profile"
										className="w-24 h-24 rounded-full border-2 border-white/20"
									/>
								</div>
							)}

							<div className="pt-4 flex gap-4">
								<a
									href="/profile/edit"
									className="inline-block rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
								>
									Edit Profile
								</a>
								<a
									href="/api/auth/signout"
									className="inline-block rounded-full bg-white/5 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/10"
								>
									Sign Out
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}