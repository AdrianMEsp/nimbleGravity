"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function JobItem({ job, candidate, onSubmit }) {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleClick() {
        if (!repoUrl) {
            setError("Please enter the repository URL");
            return;
        }
        try {
            setLoading(true);
            setError("");
            await onSubmit({
                uuid: candidate.uuid,
                candidateId: candidate.candidateId,
                jobId: job.id,
                repoUrl,
            });
            toast.success(`Application submitted successfully for ${job.title}`);
            setRepoUrl("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border p-4 rounded mb-4">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <input
                type="text"
                placeholder="Repository URL"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="border px-2 py-1 w-full mt-2"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
                onClick={handleClick}
                disabled={loading}
                className="bg-blue-600 cursor-pointer
                 text-white px-4 py-2 mt-2 rounded 
                disabled:opacity-50 hover:bg-blue-800"
            >
                {loading ? "Sending..." : "Submit"}
            </button>
        </div>
    );
}
