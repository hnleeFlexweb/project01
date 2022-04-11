import * as tmImage from "@teachablemachine/image";
import { useEffect, useState, useRef } from "react";
import KakaoSharedBtn from '../KakaoSharedBtn';

const URL = 'https://teachablemachine.withgoogle.com/models/CPs1LnIwB/';
const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

let model


export default function Result() {
    const [imgBase64, setImgBase64] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [predictionArr, setPredictionArr] = useState([]);
    const [result, setResult] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const inputRef = useRef();
    async function init() {

        model = await tmImage.load(modelURL, metadataURL);
        let maxPredictions;
        maxPredictions = model.getTotalClasses();
    }

    async function predict() {

        model = await tmImage.load(modelURL, metadataURL);
        const tempImage = document.getElementById('srcImg');
        const prediction = await model.predict(tempImage, false);
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        setPredictionArr(prediction)
        setShowResult(true)
        setLoading(false)
        setResult(prediction[0].className)
        switch (prediction[0].className) {
            case "강다니엘":
                setKeyword("당신은 강아지상의 강다니엘님을 닮으셨네요!");
                break;
            case "백현":
                setKeyword("당신은 강아지상의 백현님을 닮으셨네요!");
                break;
            case "박보검":
                setKeyword("당신은 강아지상의 박보검님을 닮으셨네요!");
                break;
            case "송중기":
                setKeyword("당신은 강아지상의 송중기님을 닮으셨네요!");
                break;

            case "공유":
                setKeyword("당신은 초식공룡상의 공유님을 닮으셨네요!");
                break;
            case "백현":
                setKeyword("당신은 초식공룡상의 윤두준님을 닮으셨네요!");
                break;
            case "박보검":
                setKeyword("당신은 초식공룡상의 피오님을 닮으셨네요!");
                break;
            case "송중기":
                setKeyword("당신은 초식공룡상의 RM님을 닮으셨네요!");
                break;

            case "김우빈":
                setKeyword("당신은 육식공룡상의 김우빈님을 닮으셨네요!");
                break;
            case "류준열":
                setKeyword("당신은 육식공룡상의 류준열님을 닮으셨네요!");
                break;
            case "육성재":
                setKeyword("당신은 육식공룡상의 육성재님을 닮으셨네요!");
                break;
            case "김경남":
                setKeyword("당신은 육식공룡상의 김경남님을 닮으셨네요!");
                break;

            case "강동원":
                setKeyword("당신은 고양이상의 강동원님을 닮으셨네요!");
                break;
            case "이종석":
                setKeyword("당신은 고양이상의 이종석님을 닮으셨네요!");
                break;
            case "안재현":
                setKeyword("당신은 고양이상의 안재현님을 닮으셨네요!");
                break;
            case "시우민":
                setKeyword("당신은 고양이상의 시우민님을 닮으셨네요!");
                break;

            case "빈지노":
                setKeyword("당신은 원숭이상의 빈지노님을 닮으셨네요!");
                break;
            case "이승기":
                setKeyword("당신은 원숭이상의 이승기님을 닮으셨네요!");
                break;
            case "찬열":
                setKeyword("당신은 원숭이상의 찬열님을 닮으셨네요!");
                break;
            case "옹성우":
                setKeyword("당신은 원숭이상의 옹성우님을 닮으셨네요!");
                break;

            default:
                break;
        }
        console.log("가장높은확률 : ", prediction[0].className)
    }

    const handleChangeFile = (event) => {
        setLoading(true);
        setShowResult(false)
        setPredictionArr(null);
        setResult(null);

        let reader = new FileReader();

        reader.onloadend = () => {

            const base64 = reader.result;
            if (base64) {
                setImgBase64(base64.toString());
            }
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
            setImgFile(event.target.files[0]);
            init().then(
                console.log("확인중..."),
                predict()
            );

        }
    }


    return (
        <section className="resultMain">
            <div className="inner">
                <h2>나와 닮은 연예인은?</h2>

                {showResult ? <b>분석결과는?</b> : <strong>{loading ? "wait a second !" : "사진을 업로드 해주세요!"}</strong>}
                <article>
                    <input ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" />
                    {imgBase64 ? <img id="srcImg" src={imgBase64}></img> :
                        null
                    }
                </article>
                {!loading && result === null ? <b>※업로드 해주신 사진은 얼굴 인식 용도로만 사용됩니다.</b> : null}

                {loading && result === null ? <p>분석중이니 잠시만 기다려 주세요 ...</p> : null}
                {showResult && result !== null ?
                    <>
                        <article>
                            <article>
                                <div>{showResult ? `${(predictionArr[0].probability * 100).toFixed(1)}%` : null}</div>
                                <div>{showResult ? predictionArr[0].className : null}</div>
                            </article>
                            <strong>{keyword}</strong>
                        </article>
                        <article>
                            <img id="srcImg" src={require(`../img/${result}.jpeg`)}></img>
                        </article>
                        <div className='adfitTwo'></div>
                        <div>{showResult ? `${(predictionArr[1].probability * 100).toFixed(1)}%` : null}</div>
                    </>
                    : null}
                {showResult ? <article>
                    <KakaoSharedBtn name={predictionArr[0].className}></KakaoSharedBtn>
                </article> : null
                }
            </div>
        </section>
    )
}
