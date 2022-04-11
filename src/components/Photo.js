
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Photo() {

    const [imageSrc, setImageSrc] = useState('');


    const viewpicFile = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result); resolve();
            };
        });
    };

    return (
        <section className="photo">
            <div className="inner" >
                <input id="picFile" type="file"
                    onChange={(e) => { viewpicFile(e.target.files[0]) }} />
                {
                    imageSrc ?
                        <label htmlFor="picFile">
                            <img src={imageSrc} alt="배너이미지1" />
                        </label>
                        :
                        null
                }
            </div>
        </section>
    )
}


