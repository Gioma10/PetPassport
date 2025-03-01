import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

export default function PassportNavigation({ handlePrev, handleNext }) {
    return (
        <>
            <div className="text-2xl absolute left-10 cursor-pointer" onClick={handlePrev}>
                <FiArrowLeftCircle />
            </div>
            <div className="text-2xl absolute right-10 cursor-pointer" onClick={handleNext}>
                <FiArrowRightCircle />
            </div>
        </>
    );
}
