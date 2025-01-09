import { useState } from "react";

import { Button } from "@/components/ui/button";

import TaskFormDialog from "./TaskFormDialog";

const CreateNewTaskButton = () => {
  const [openFormModal, setOpenFormModal] = useState(false);

  return (
    <>
      <TaskFormDialog
        open={openFormModal}
        setOpen={setOpenFormModal}
        prefill={null}
      />
      <Button
        onClick={() => setOpenFormModal(true)}
        className="absolute rounded-[50%] w-[52px] h-[52px] bg-[#6A6CE0] hover:bg-[#6162b8] bottom-2 flex items-center justify-center"
      >
        <span className="text-white text-3xl">+</span>
      </Button>
    </>
  );
};

export default CreateNewTaskButton;
