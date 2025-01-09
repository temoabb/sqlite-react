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

const TaskCard: React.FC<TaskEntity> = (task) => {
  const [, setIsCollapsed] = useState(false);

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
      <AccordionItem className="border-none" value={`item-${task.id}`}>
        <AccordionTrigger className="border-none hover:no-underline">
          <div className="flex items-center gap-x-1">
            <span className="text-muted-foreground font-[500] text-sm text-[#30507D]">
              {task.title}
            </span>

            {task.isCompleted ? (
              <span className="text-green-400">
                <CircleCheck size={20} />
              </span>
            ) : null}
          </div>
        </AccordionTrigger>

        <AccordionContent className="border-none pb-2">
          <input
            disabled
            readOnly
            className="w-full p-3 rounded-none shadow-insetInputShadow font-[600] bg-[#E8F1FD] text-[#6C86A8] text-[10px] leading-[15px]"
            value={task.description}
          />

          <div className="mt-2">
            <TaskActionsToolbar {...task} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskCard;
