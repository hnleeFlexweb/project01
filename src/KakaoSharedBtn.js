import { useEffect } from "react";
import styled from "styled-components";

const KakaoShareButton = styled.button`
   background-color:#FED16E;
   padding:10px 15px;
   border-radius:10px;
   color:#353535;
   font-size:15px;
   font-weight:bolder;
   border-width:0px;
   display:flex;
   justify-content:space-evenly;
   align-items:center;
   flex-direction:row;
   @media (min-width: 800px) {
    font-size:20px;
    padding:15px 20px;
  }
`;

const KakaoShareBtn = ({ name }) => {

    useEffect(() => {
        createKakaoButton({ name });
    }, [name]);


    const createKakaoButton = ({ name }) => {

        const path = process.env.PUBLIC_URL;

        if (window.Kakao) {
            const kakao = window.Kakao;

            if (!kakao.isInitialized()) {

                kakao.init("해당하는 id값 사용");
            }
            kakao.Link.createDefaultButton({
                container: "#kakao-link-btn",
                objectType: "feed",
                content: {
                    title: "나와 닮은 연예인은?",
                    description: `나와 닮은 연예인은 ${name}이네요! 결과를 확인하고 공유해보세요!`,
                    imageUrl: `${path}/result/${name}.jpeg`,
                },
            });
        }
    };
    return (
        <KakaoShareButton id="kakao-link-btn">
            공유하기
        </KakaoShareButton>
    );
};


export default KakaoShareBtn;