"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function ProfileEditPage() {
	const router = useRouter();
	const { data: user, isLoading } = api.user.getCurrent.useQuery();
	const updateProfile = api.user.update.useMutation({
		onSuccess: () => {
			router.push("/profile");
		},
	});

	const [formData, setFormData] = useState({
		name: "",
		email: "",
	});

	const [errors, setErrors] = useState<{
		name?: string;
		email?: string;
		general?: string;
	}>({});

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] flex items-center justify-center">
				<div className="text-white text-xl">Loading...</div>
			</div>
		);
	}

	if (!user) {
		router.push("/api/auth/signin");
		return null;
	}

	if (formData.name === "" && formData.email === "") {
		setFormData({
			name: user.name || "",
			email: user.email || "",
		});
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors({});

		const newErrors: typeof errors = {};
		
		if (formData.name && formData.name.length > 100) {
			newErrors.name = "Name must be less than 100 characters";
		}

		if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			await updateProfile.mutateAsync({
				name: formData.name || undefined,
				email: formData.email || undefined,
			});
		} catch (error) {
			setErrors({ general: "Failed to update profile. Please try again." });
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold text-white mb-8">Edit Profile</h1>
					
					<form onSubmit={handleSubmit} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
						<div className="space-y-6">
							<div>
								<label htmlFor="name" className="block text-white/70 mb-2">
									Name
								</label>
								<input
									type="text"
									id="name"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
									placeholder="Enter your name"
								/>
								{errors.name && (
									<p className="mt-1 text-red-400 text-sm">{errors.name}</p>
								)}
							</div>

							<div>
								<label htmlFor="email" className="block text-white/70 mb-2">
									Email
								</label>
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
									placeholder="Enter your email"
								/>
								{errors.email && (
									<p className="mt-1 text-red-400 text-sm">{errors.email}</p>
								)}
							</div>

							{errors.general && (
								<div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
									<p className="text-red-300 text-sm">{errors.general}</p>
								</div>
							)}

							<div className="flex gap-4 pt-4">
								<button
									type="submit"
									disabled={updateProfile.isPending}
									className="rounded-full bg-white/10 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{updateProfile.isPending ? "Saving..." : "Save Changes"}
								</button>
								<button
									type="button"
									onClick={() => router.push("/profile")}
									className="rounded-full bg-white/5 px-6 py-2 font-semibold text-white no-underline transition hover:bg-white/10"
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</main>
		</div>
	);
}