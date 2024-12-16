import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const USER_ID_UNTIL_AUTH_WORKS = "812c7d3e-c9fc-4d56-a931-ce06c8128ab6";

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-lg font-semibold">Policy Name</Label>
        <Input className="py-7 text-lg" placeholder="Enter policy name..." />
      </div>
      <Separator className="my-5" />
      <div className="w-full flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-semibold">Purpose Statement</Label>
            <Textarea 
              placeholder="Enter the purpose of this policy..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-semibold">Policy Statement</Label>
            <Textarea 
              
              placeholder="Enter the policy statement..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Label className="text-lg font-semibold">Procedure</Label>
          <Textarea 
            placeholder="Enter the procedure details..."
          />
        </div>
      </div>
    </div>
  );
}