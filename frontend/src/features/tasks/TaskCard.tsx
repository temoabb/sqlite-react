import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { TaskEntity } from "./Tasks.config";

const TaskCard: React.FC<TaskEntity> = ({
  id,
  title,
  description,
  isCompleted,
}) => {
  return (
    <Accordion
      className="border shadow-cardShadow p-2 rounded-lg w-full max-w-[335px] bg-white"
      type="single"
      collapsible
    >
      <AccordionItem className="border-none" value={`item-${id}`}>
        <AccordionTrigger className="border-none hover:no-underline">
          {title}
        </AccordionTrigger>

        <AccordionContent className="border-none">
          <input
            disabled
            readOnly
            className="w-full p-3 rounded-none shadow-insetInputShadow font-[600] bg-[#E8F1FD] text-[#6C86A8] text-[10px] leading-[15px]"
            value={description}
          />
          <p className="my-4">{isCompleted ? "Completed" : "Not completed"}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskCard;
