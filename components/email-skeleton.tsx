import { Skeleton } from "@/components/ui/skeleton";

const EmailSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 w-full rounded-lg border bg-card shadow-sm w-full text-sm p-8">
      <div className="space-y-2 w-full">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
};

export default EmailSkeleton;
