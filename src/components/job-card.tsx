import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Briefcase, Star, Clock, Heart, Share2, Flag } from "lucide-react";
import type { JobRecommendationsOutput } from "@/ai/flows/job-recommendations";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';


type Job = JobRecommendationsOutput["recommendations"][0];

const MatchPill = ({ children }: { children: React.ReactNode }) => (
    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{children}</Badge>
);

const BenefitPill = ({ children }: { children: React.ReactNode }) => (
    <Badge variant="outline" className="text-muted-foreground">{children}</Badge>
);

const getMatchLabel = (score: number) => {
    if (score > 75) return "Strong Match";
    if (score > 50) return "Good Match";
    return "Fair Match";
}

export function JobCard({ job }: { job: Job }) {
  const postedAt = new Date(job.postedAt);
  const timeAgo = formatDistanceToNow(postedAt, { addSuffix: true });
  
  const isNew = (Date.now() - postedAt.getTime()) < 48 * 60 * 60 * 1000; // 48 hours

  return (
    <Card className="flex flex-col rounded-xl hover:shadow-lg hover:ring-1 hover:ring-primary/50 transition-all duration-300">
        <CardHeader>
            <div className="flex items-start justify-between gap-4">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={job.companyLogo} alt={`${job.companyMasked} logo`} />
                        <AvatarFallback className="rounded-lg">{job.companyMasked.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base font-bold line-clamp-2 leading-tight">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild><a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{job.title}</a></TooltipTrigger>
                                    <TooltipContent><p>{job.title}</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription className="text-sm pt-1">{job.companyMasked}</CardDescription>
                    </div>
                </div>
                 <div className="flex flex-col items-end flex-shrink-0">
                    <Badge variant="outline" className="text-xs text-muted-foreground mb-1">{timeAgo}</Badge>
                    {isNew && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">New</Badge>}
                    {job.urgency === 'urgent' && <Badge variant="destructive">Urgent</Badge>}
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location.city}, {job.location.country}</div>
                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.shift} Shift</div>
            </div>

            <div className="text-lg font-bold text-primary">
                {job.salary.visible ? `${new Intl.NumberFormat('en-US').format(job.salary.min)} - ${new Intl.NumberFormat('en-US').format(job.salary.max)} ${job.salary.currency}` : 'Negotiable'}
                <span className="text-sm font-normal text-muted-foreground">/{job.salary.type}</span>
            </div>

            <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Top Match Reasons:</p>
                <div className="flex flex-wrap gap-2">
                    {job.match.reasons.map((reason, i) => <MatchPill key={i}>{reason}</MatchPill>)}
                </div>
            </div>
            
            <div>
                 <p className="text-xs font-semibold text-muted-foreground mb-2">Benefits:</p>
                <div className="flex flex-wrap gap-2">
                    {job.benefits.map(benefit => <BenefitPill key={benefit}>{benefit}</BenefitPill>)}
                </div>
            </div>

        </CardContent>
        <CardFooter className="flex-col items-start gap-4 pt-4 border-t bg-muted/50 rounded-b-xl">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-medium">{getMatchLabel(job.match.score)}</p>
                    <p className="text-xs font-bold text-primary">{job.match.score}%</p>
                </div>
                <Progress value={job.match.score} className="h-2" />
            </div>

            <div className="w-full flex items-center gap-2">
                 <Button asChild className="w-full">
                    <a href={job.url} target="_blank" rel="noopener noreferrer">{job.applied ? 'View Application' : 'View & Apply'}</a>
                </Button>
                <TooltipProvider>
                    <Tooltip><TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0" aria-label="Save job">
                           <Heart className={cn("h-4 w-4", job.saved && "fill-red-500 text-red-500")} />
                        </Button>
                    </TooltipTrigger><TooltipContent>Save</TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0" aria-label="Share job">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger><TooltipContent>Share</TooltipContent></Tooltip>
                </TooltipProvider>
            </div>
        </CardFooter>
    </Card>
  );
}
