import { Spinner } from "@material-tailwind/react";

export default function LoadingSpinnerIcon(props) {
    return ( <Spinner className={`${props.className}`} /> );
}