import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { useState, useEffect, useCallback } from "react";

interface InfoModalProps{
    visible?: boolean;
    onClose: any;
};

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const { movieId } = useInfoModal();

    const { data = {}} = useMovie(movieId);
    
    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!visible){
        return null;
    }

    return(
        <div>
        </div>
    )

}


export default InfoModal;