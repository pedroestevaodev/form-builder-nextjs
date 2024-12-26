import { ImSpinner2 } from "react-icons/im";

const Loading = () => {
    return (
        <div className="flex items-center justify-center size-full">
            <ImSpinner2 className="size-12 animate-spin" />
        </div>
    );
};

export default Loading;