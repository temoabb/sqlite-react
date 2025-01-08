import { useState } from "react";

import { CircleCheck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import TaskActionsToolbar from "./TaskActionsToolbar";

import { TaskEntity } from "./Tasks.config";

const TaskCard: React.FC<TaskEntity> = ({
  id,
  title,
  description,
  isCompleted,
}) => {
  const [_, setIsCollapsed] = useState(false);

  const handleToggleValue = () => {
    setIsCollapsed((value) => !value);
  };

  return (
    <Accordion
      onValueChange={handleToggleValue}
      collapsible
      type="single"
      className="border shadow-cardShadow px-2.5 rounded-lg overflow-hidden w-full bg-white"
    >
      <AccordionItem className="border-none" value={`item-${id}`}>
        <AccordionTrigger className="border-none hover:no-underline">
          <div className="flex items-center gap-x-1">
            <span className="text-muted-foreground font-[500] text-sm text-[#30507D]">
              {title}
            </span>

            {!isCompleted ? (
              <span className="text-green-400">
                <CircleCheck size={20} />
              </span>
            ) : null}
          </div>
        </AccordionTrigger>

        {/* <div
          className="mb-2"
          style={{
            // transition: "opacity 0.2s ease-out",
            opacity: isCollapsed ? 0 : 1,
            height: isCollapsed ? 0 : "auto",
            overflow: "hidden",
          }}
        >
          <TaskActionsToolbar isCompleted={Boolean(isCompleted)} taskId={id} />
        </div> */}

        <AccordionContent className="border-none pb-2">
          <input
            disabled
            readOnly
            className="w-full p-3 rounded-none shadow-insetInputShadow font-[600] bg-[#E8F1FD] text-[#6C86A8] text-[10px] leading-[15px]"
            value={description}
          />

          <div className="mt-2">
            <TaskActionsToolbar
              isCompleted={Boolean(isCompleted)}
              taskId={id}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskCard;
