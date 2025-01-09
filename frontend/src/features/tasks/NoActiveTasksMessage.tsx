import { Separator } from "@/components/ui/separator";

const NoActiveTasksMessage = () => {
  return (
    <>
      <Separator />
      <div className="mt-2 mb-5 text-[#6A6CE0] text-[12px] text-center">
        Looks like there are no active tasks in this category. Would you like to
        create a new one?
      </div>
    </>
  );
};

export default NoActiveTasksMessage;
