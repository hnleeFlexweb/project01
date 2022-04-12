import * as tmImage from "@teachablemachine/image";
import { useState, } from "react";

// teachable machine에서 받은 공유 가능한 링크를 url 변수에 넣어줌
const URL = 'https://teachablemachine.withgoogle.com/models/CPs1LnIwB/';
const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

let model;


export default function Result() {
    // 업로드한 이미지 미리보기를 위해 사용
    const [imgBase, setImgBase] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [predictionArr, setPredictionArr] = useState([]);
    const [result, setResult] = useState(null);
    const [keyword, setKeyword] = useState(null);

    async function init() {
        let maxPredictions;

        // 모델이 저장된 곳에서 모델 파일들을 가지고 와서 로드를 한 후 모델에 저장
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        // 총 사진 갯수
        console.log(maxPredictions);
    }

    async function predict() {
        console.log(model)
        model = await tmImage.load(modelURL, metadataURL);
        // 아이디를 통해서 문서중에 있는 srcImg를 가져옴
        const tempImage = document.getElementById('srcImg');
        // 이미지를 이용해서 가져온 모델로 예측을 수행함 ( 두번째 인자로 flipped 여부! 안 뒤집혔으니 false)
        const prediction = await model.predict(tempImage, false);

        // sort : 콜백함수 호출
        // 데이터형 변환 : parseFloat 문자열에서 숫자를 추출
        prediction.sort((a, b) => b.probability - a.probability);
        setPredictionArr(prediction)
        setShowResult(true)
        setLoading(false)
        setResult(prediction[0].className)

        // prediction[0].className 변수값과 case 의 값이 일치한 경우 그에 맞는 setKeyword 넣어줌 
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
            case "민아":
                setKeyword("당신은 강아지상의 민아님을 닮으셨네요!");
                break;
            case "윈터":
                setKeyword("당신은 강아지상의 윈터님을 닮으셨네요!");
                break;
            case "츄":
                setKeyword("당신은 강아지상의 츄님을 닮으셨네요!");
                break;
            case "한지민":
                setKeyword("당신은 강아지상의 한지민님을 닮으셨네요!");
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
                setKeyword("당신은 초식공룡상의 `RM`님을 닮으셨네요!");
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
            case "크리스탈":
                setKeyword("당신은 고양이상의 크리스탈님을 닮으셨네요!");
                break;
            case "제시":
                setKeyword("당신은 고양이상의 제시님을 닮으셨네요!");
                break;
            case "안소희":
                setKeyword("당신은 고양이상의 안소희님을 닮으셨네요!");
                break;
            case "류진":
                setKeyword("당신은 고양이상의 류진님을 닮으셨네요!");
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

            case "솔라":
                setKeyword("당신은 꼬부기상의 솔라님을 닮으셨네요!");
                break;
            case "예리":
                setKeyword("당신은 꼬부기상의 예리님을 닮으셨네요!");
                break;
            case "유정":
                setKeyword("당신은 꼬부기상의 유정님을 닮으셨네요!");
                break;
            case "하연수":
                setKeyword("당신은 꼬부기상의 하연수님을 닮으셨네요!");
                break;

            case "경리":
                setKeyword("당신은 여우상의 경리님을 닮으셨네요!");
                break;
            case "구재이":
                setKeyword("당신은 여우상의 구재이님을 닮으셨네요!");
                break;
            case "김민주":
                setKeyword("당신은 여우상의 김민주님을 닮으셨네요!");
                break;
            case "차예련":
                setKeyword("당신은 여우상의 차예련님을 닮으셨네요!");
                break;

            case "나연":
                setKeyword("당신은 토끼상의 나연님을 닮으셨네요!");
                break;
            case "수지":
                setKeyword("당신은 토끼상의 수지님을 닮으셨네요!");
                break;
            case "이유비":
                setKeyword("당신은 토끼상의 이유비님을 닮으셨네요!");
                break;
            case "장원영":
                setKeyword("당신은 토끼상의 장원영님을 닮으셨네요!");
                break;

            default:
                break;
        }
    }

    // input 파일이 체인지 되면
    const handleChangeFile = (event) => {
        // useState 값을 true로 변경
        setLoading(true);
        // useState 값을 false 변경
        setShowResult(false)
        setPredictionArr(null);
        setResult(null);

        let reader = new FileReader();

        reader.onloadend = () => {
            // 읽기가 완료되면 아래 구문 실행
            const base = reader.result;
            if (base) {
                // 파일 base 상태를 업데이트
                setImgBase(base.toString());
            }
        }

        if (event.target.files[0]) {
            // 파일을 읽은 후 저장
            reader.readAsDataURL(event.target.files[0]);
            // 파일을 업데이트함
            setImgFile(event.target.files[0]);
            // init 함수가  실행된 후 predict 함수 실행
            init().then(
                predict()
            );

        }
    }


    return (
        <section className="resultMain">
            <div className="inner">
                <h2>나와 닮은 연예인은?</h2>
                {/* showResult가 참일 경우 '분석결과는?'을 보여주고 거짓일 경우에 로딩이 참이라면  "wait a second !" 문장을 보여주고 거짓일 경우 "사진을 업로드 해주세요!" 문장을 보여줌*/}
                {showResult ? <b>분석결과는?</b> : <strong>{loading ? "wait a second !" : "사진을 업로드 해주세요!"}</strong>}
                <article className="putPic">
                    <input onChange={handleChangeFile} type="file" accept="image/*" />
                    {imgBase ? <img id="srcImg" src={imgBase}></img> :
                        null
                    }
                </article>
                {!loading && result === null ? <b>※업로드 해주신 사진은 얼굴 인식 용도로만 사용됩니다.</b> : null}

                {loading && result === null ?
                    <div className="wait">
                        <img src={require(`../img/loading.gif`)} />
                        <p>분석중이니 잠시만 기다려 주세요 ...</p>
                    </div>
                    : null}
                {showResult && result !== null ?
                    <>
                        <article className="resultPic">
                            <div className="resultPercent"> >> {showResult ? predictionArr[0].className : null} : {showResult ? `${(predictionArr[0].probability * 100).toFixed(1)}%` : null}</div>
                            <strong>{keyword}</strong>
                            <img id="srcImg" src={require(`../img/${result}.jpeg`)} />
                        </article>
                    </>
                    : null}
            </div>
        </section>
    )
}

// accept="image/* : 일일이 확장자명의 적지 않고 파일의 유형을 통제할 수 있음