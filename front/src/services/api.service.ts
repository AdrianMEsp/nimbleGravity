const APIURL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function getCandidateByEmail(email: string) {
    try {
        const res = await fetch(`${APIURL}/api/candidate/get-by-email?email=${email}`)
        return res.json();
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getJobs() {
    try {
        const res = await fetch(`${APIURL}/api/jobs/get-list`)
        return res.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function applyToJob({ uuid, candidateId, applicationId, jobId, repoUrl }: {
    uuid: string;
    candidateId: string;
    applicationId: string;
    jobId: string;
    repoUrl: string;
}) {
    try {
        const res = await fetch(`${APIURL}/api/candidate/apply-to-job`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uuid, candidateId, applicationId, jobId, repoUrl })
        })
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }
        return await res.json();
    } catch (error: any) {
        throw new Error(`Failed to apply: ${error.message}`);
    }

}