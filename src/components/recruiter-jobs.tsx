
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const mockJobs = [
    { title: "Heavy Duty Driver", company: "Al-Futtaim Logistics", location: "Dubai, UAE", salary: "AED 4,500", status: "Urgent" },
    { title: "Household Cook", company: "Private Villa", location: "Riyadh, KSA", salary: "SAR 3,000", status: "Open" },
    { title: "Construction Painter", company: "Emaar Properties", location: "Abu Dhabi, UAE", salary: "Negotiable", status: "Closing Soon" },
]

export function RecruiterJobs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recruiter Requirements (Jobs)</CardTitle>
                <CardDescription>New job postings from recruiters in the Gulf region.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockJobs.map((job, i) => (
                    <Card key={i} className="p-4 flex flex-wrap justify-between items-center">
                        <div>
                            <h4 className="font-semibold">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                            <p className="text-sm font-bold text-primary">{job.salary}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                             <Badge variant={job.status === 'Urgent' ? 'destructive' : 'secondary'}>{job.status}</Badge>
                            <Button size="sm">Suggest Candidates</Button>
                        </div>
                    </Card>
                ))}
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">View All Jobs</Button>
            </CardFooter>
        </Card>
    )
}
