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

export async function applyToJob({ uuid, candidateId, jobId, repoUrl }) {
    try {
        const res = await fetch(`${APIURL}/api/candidate/apply-to-job`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uuid, candidateId, jobId, repoUrl })
        })
        return res.json();
    } catch (error) {
        throw new Error(error);
    }

}