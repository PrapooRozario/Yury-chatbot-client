import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [answers, setAnswers] = useState([]);
  const [loading, setloading] = useState(false);
  const handlePrompt = async (data) => {
    setloading(true);
    reset();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/prompt/${data?.prompt}`
      );
      setAnswers([...answers, { answer: res?.data?.answer }]);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto flex flex-col">
      <div className="flex-grow overflow-scroll scrollbar-hide mb-52">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-4">
          {answers.map((answer) => (
            <div key={answer?.answer} className="flex items-start p-2 sm:p-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="/yury.svg"
                  alt="Yury"
                  className="scale-180 mt-1 w-full h-full"
                />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: answer?.answer }}
                className="ml-2 sm:ml-4 mt-1 text-gray-700 flex-grow text-sm sm:text-base"
              ></p>
            </div>
          ))}
        </div>
      </div>
      <form
        className="fixed bottom-4 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] bg-white border border-neutral-300 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-2xl sm:rounded-3xl shadow-lg"
        onSubmit={handleSubmit(handlePrompt)}
      >
        <h1 className="text-xl sm:text-2xl text-center mb-4 sm:mb-6">
          আপনি কী গণিত সম্পর্কিত কিছু জানতে চান?
        </h1>
        <input
          {...register("prompt", { required: true })}
          type="text"
          disabled={loading}
          placeholder={loading ? "Thinking..." : "Ask Yury"}
          className="w-full px-4 sm:px-7 py-3 sm:py-4 text-sm rounded-full border border-neutral-300 bg-white focus:outline-0"
        />
      </form>
    </div>
  );
}
