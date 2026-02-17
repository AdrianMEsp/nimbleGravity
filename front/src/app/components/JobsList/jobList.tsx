"use client";
import { applyToJob, getCandidateByEmail, getJobs } from "@/src/services/api.service";
import { useEffect, useState } from "react";
import JobItem from "../JobItem/jobItem";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const candidateData = await getCandidateByEmail("adrianmespindola@gmail.com");
                setCandidate(candidateData);
                const jobsData = await getJobs();
                setJobs(jobsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div
            className="max-w-md mx-auto mt-8">
            <h1
                className="text-2xl flex justify-center font-bold mb-4">
                Open positions</h1>
            {jobs.map((job) => (
                <JobItem
                    key={job.id}
                    job={job}
                    candidate={candidate}
                    onSubmit={applyToJob}
                />))}
        </div>);
}
