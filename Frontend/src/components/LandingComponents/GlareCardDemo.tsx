import { GlareCard } from "../ui/glare-card";

export function GlareCardDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <GlareCard className="flex flex-col items-center justify-center">
        <img
          className="h-full w-full absolute inset-0 object-cover"
          src="https://i.pinimg.com/736x/6f/e6/5b/6fe65be4068be6b51ccca35d80c2c983.jpg"
        />
      </GlareCard>
      <GlareCard className="flex flex-col items-center justify-center">
        <img
          className="h-full w-full absolute inset-0 object-cover"
          src="https://i.pinimg.com/736x/78/aa/ce/78aace3aa4add479008892a7bab257fd.jpg"
        />
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
         <img
          className="h-full w-full absolute inset-0 object-cover"
          src="https://i.pinimg.com/736x/75/7e/b9/757eb909c00857b68009c583fb351e38.jpg"
        />
      </GlareCard>
    </div>
  );
}
