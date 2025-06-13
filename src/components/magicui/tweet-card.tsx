import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TweetProps extends React.HTMLAttributes<HTMLDivElement> {
  tweet: {
    author: string;
    username: string;
    avatar: string;
    body: string;
    timestamp: string;
    url: string;
  };
  className?: string;
}

export const TweetCard = ({ tweet, className, ...props }: TweetProps) => {
  return (
    <Card
      className={cn(
        "w-full max-w-lg rounded-2xl border-border/20 bg-background/50 p-6 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <CardContent className="p-0">
        <div className="mb-4 flex items-center gap-4">
          <Avatar>
            <AvatarImage src={tweet.avatar} alt={tweet.author} />
            <AvatarFallback>{tweet.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{tweet.author}</p>
            <p className="text-sm text-muted-foreground">@{tweet.username}</p>
          </div>
        </div>
        <p className="mb-4 whitespace-pre-line text-foreground/80">
          {tweet.body}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-border/50">
            View on X
          </Badge>
          <p className="text-sm text-muted-foreground">{tweet.timestamp}</p>
        </div>
      </CardContent>
    </Card>
  );
}; 