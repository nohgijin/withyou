import { useState, lazy, Suspense } from "react";
import { cityMapData } from "./mapData";
const CityMap = lazy(() => import("./CityMap"));

const days = [
  {
    day: 1,
    date: "5/22 (금)",
    city: "이스탄불",
    badge: "도착",
    color: "#C4573A",
    icon: "🛬",
    title: "이스탄불 도착 & 첫 밤",
    mapUrl: "https://www.google.com/maps/dir/Istanbul+Airport+IST/Sultanahmet+Square+Istanbul/Istiklal+Avenue+Istanbul/Galata+Tower+Istanbul/Hotel+Arcadia+Blue+Istanbul",
    mapStops: ["이스탄불 공항", "술탄아흐메트", "이스티클랄 거리", "갈라타 탑", "🏨 호텔"],
    mapSegments: [
      { icon: "🚇", mode: "지하철 + 트램", time: "약 75분", dist: "40km", tip: "M11(하발리스트) → Gayrettepe 환승 → M2 → Taksim → T2 트램 → T1 트램 Sultanahmet 하차. 이스탄불카트(Istanbulkart) 교통카드 추천, 1회 약 ₺44" },
      { icon: "🚃", mode: "트램 + 퓨니큘라", time: "약 30분", dist: "6km", tip: "T1 트램 Kabataş 방향 승차 → Kabataş 하차 → F1 퓨니큘라 Taksim 광장 하차. 이스티클랄 거리 초입에 도착" },
      { icon: "🚶", mode: "도보", time: "약 10분", dist: "700m", tip: "이스티클랄 거리 남쪽 끝에서 갈라타 탑 방향 내리막길 따라 걸어 내려가기" },
      { icon: "🚃", mode: "트램", time: "약 15분", dist: "2.1km", tip: "갈라타 탑 아래 Karaköy 정류장 → T1 트램 Bağcılar 방향 승차 → Sultanahmet 역 하차. 술탄아흐메트 지구 호텔까지 도보 3~5분 (Hotel Arcadia Blue Istanbul 기준)" },
    ],
    items: [
      { time: "16:10", text: "이스탄불 공항 도착 (OZ 0551)" },
      { time: "18:00", text: "숙소 체크인 (술탄아흐메트 or 갈라타 지구)" },
      { time: "19:30", text: "이스티클랄 거리 & 갈라타 탑 야경 산책" },
      { time: "20:30", text: "터키식 케밥 or 피데로 첫 끼 🍖" },
    ],
    tip: "달러/유로 환전 후 현지에서 리라로 교환. 트래블카드도 유용!",
    attractions: [
      {
        emoji: "🛤️",
        name: "이스티클랄 거리",
        photo: "https://source.unsplash.com/600x300/?istiklal,istanbul,street",
        desc: "이스탄불 최대 번화가. 1.4km 길이의 보행자 거리로 카페·레스토랑·갤러리가 가득하며, 클래식 노면전차가 오간다. 낮보다 밤이 더 활기차다.",
      },
      {
        emoji: "🗼",
        name: "갈라타 탑",
        photo: "https://source.unsplash.com/600x300/?galata,tower,istanbul",
        desc: "1348년 제노바인이 세운 67m 높이의 원통형 석탑. 전망대에서 골든혼, 보스포루스 해협, 이스탄불 구시가 스카이라인을 한눈에 감상할 수 있다.",
      },
    ],
  },
  {
    day: 2,
    date: "5/23 (토)",
    city: "이스탄불",
    badge: "관광",
    color: "#C4573A",
    icon: "🕌",
    title: "이스탄불 핵심 관광",
    mapUrl: "https://www.google.com/maps/dir/Hagia+Sophia+Istanbul/Blue+Mosque+Istanbul/Topkapi+Palace+Istanbul/Grand+Bazaar+Istanbul/Galata+Bridge+Istanbul/Hotel+Arcadia+Blue+Istanbul",
    mapStops: ["아야 소피아", "블루 모스크", "톱카프 궁전", "그랜드 바자르", "보스포루스", "🏨 호텔"],
    mapSegments: [
      { icon: "🚶", mode: "도보", time: "3분", dist: "250m", tip: "히포드롬 광장을 사이에 두고 마주보고 있어 바로 걸어서 이동 가능" },
      { icon: "🚶", mode: "도보", time: "8분", dist: "600m", tip: "블루 모스크 옆 굴하네 공원 방향 오르막길 따라 이동" },
      { icon: "🚶", mode: "도보", time: "12분", dist: "800m", tip: "톱카프 서문(Bab-ı Hümayun) 나와 내리막길 직진. 그랜드 바자르 정문까지" },
      { icon: "🚶", mode: "도보", time: "15분", dist: "1.1km", tip: "바자르 나와 에미르뇌뉘(Eminönü) 방향 내리막. 갈라타 다리 옆 선착장에서 크루즈 탑승" },
      { icon: "🚶", mode: "도보", time: "약 20분", dist: "1.5km", tip: "크루즈 하선 후 에미르뇌뉘에서 술탄아흐메트 방향으로 해안도로 따라 동쪽 이동. 오르막 구간 있음. Hotel Arcadia Blue Istanbul까지 도보 직결" },
    ],
    items: [
      { time: "09:00", text: "아야 소피아 → 블루 모스크 → 톱카프 궁전" },
      { time: "13:00", text: "술탄아흐메트 근처 로컬 식당에서 점심" },
      { time: "14:30", text: "그랜드 바자르 구경 & 흥정 (절반 가격부터!)" },
      { time: "17:00", text: "보스포루스 해협 선셋 크루즈 🚢" },
    ],
    tip: "모스크 입장 시 어깨/무릎 가리는 옷 + 여성은 스카프 준비",
    attractions: [
      {
        emoji: "🏛️",
        name: "아야 소피아",
        photo: "https://source.unsplash.com/600x300/?hagia,sophia,istanbul",
        desc: "537년 완공된 비잔틴 건축의 걸작. 천 년간 기독교 성당으로 쓰이다 오스만 정복 후 모스크로, 현재는 다시 모스크로 운영 중. 지름 31m의 거대한 돔과 황금 모자이크가 압도적이다.",
      },
      {
        emoji: "🕌",
        name: "블루 모스크",
        photo: "https://source.unsplash.com/600x300/?blue,mosque,istanbul",
        desc: "1616년 완공. 세계 유일의 6첨탑 모스크. 내부를 장식한 2만 개 이상의 이즈닉 블루 타일에서 '블루 모스크'라는 별명이 붙었다.",
      },
      {
        emoji: "👑",
        name: "톱카프 궁전",
        photo: "https://source.unsplash.com/600x300/?topkapi,palace,istanbul",
        desc: "15세기부터 400년간 오스만 제국 술탄의 거처. 4개의 정원 구역으로 이루어진 광대한 궁전 박물관. 선지자 무함마드의 유물, 에메랄드 단검 등 귀한 소장품이 있다.",
      },
      {
        emoji: "🏪",
        name: "그랜드 바자르",
        photo: "https://source.unsplash.com/600x300/?grand,bazaar,istanbul",
        desc: "1461년 개장한 세계 최대 실내 시장 중 하나. 64개 골목에 4,000개 이상의 상점. 카펫·도자기·터키램프·향신료·금세공품이 가득하며 흥정이 기본 문화다.",
      },
      {
        emoji: "🚢",
        name: "보스포루스 해협 크루즈",
        photo: "https://source.unsplash.com/600x300/?bosphorus,istanbul,strait",
        desc: "유럽과 아시아 대륙을 가르는 해협을 배 위에서 감상. 돌마바흐체 궁전, 루멜리 요새 등을 지나며 선셋을 만끽할 수 있다.",
      },
    ],
  },
  {
    day: 3,
    date: "5/24 (일)",
    city: "카파도키아",
    badge: "이동 ✈️",
    color: "#D4883E",
    icon: "🏜️",
    title: "카파도키아 도착 & 선셋 하이킹",
    mapUrl: "https://www.google.com/maps/dir/Kayseri+Airport+Turkey/Goreme+Nevsehir+Turkey/Rose+Valley+Cappadocia+Turkey/Kelebek+Special+Cave+Hotel+Goreme",
    mapStops: ["카이세리 공항", "괴레메 마을", "로즈 밸리", "🏨 동굴 호텔"],
    mapSegments: [
      { icon: "🚌", mode: "공항 셔틀버스", time: "약 75분", dist: "75km", tip: "공항 도착 후 'Göreme' 행 셔틀 탑승. 비용 약 ₺300~400. 또는 호텔 픽업 서비스 사전 예약 추천. 택시는 약 ₺800" },
      { icon: "🚶", mode: "도보 또는 택시", time: "15~20분", dist: "1.5km", tip: "괴레메 마을에서 로즈 밸리 입구까지 도보 가능. 내리막이라 갈 때는 편하지만 올 때는 오르막이므로 택시(약 ₺100) 권장" },
      { icon: "🚕", mode: "택시 또는 도보", time: "5~10분", dist: "700m", tip: "로즈 밸리에서 하산 후 괴레메 마을 중심으로 귀환. Kelebek Special Cave Hotel까지 도보 약 10분 또는 택시 ₺50~80" },
    ],
    items: [
      { time: "07:00", text: "국내선으로 카파도키아 이동 (약 1시간 20분)" },
      { time: "10:00", text: "동굴 호텔 체크인 — 화산암 객실 체험!" },
      { time: "14:00", text: "괴레메 마을 자유 산책 & 카페 탐방" },
      { time: "17:00", text: "로즈 밸리 선셋 하이킹 🌅" },
      { time: "20:00", text: "도자기 케밥(Testi Kebab) 저녁" },
    ],
    tip: "네브셰히르(NAV) vs 카이세리(ASR) 공항 비교 후 예약. 카이세리가 편수 많음",
    attractions: [
      {
        emoji: "🏘️",
        name: "괴레메 마을",
        photo: "https://source.unsplash.com/600x300/?goreme,cappadocia,village",
        desc: "카파도키아 여행의 베이스캠프. 화산 응회암을 깎아 만든 동굴 카페와 숙소가 즐비하다. 야외박물관과 인접해 있어 도보 이동이 편리하고, 마을 자체가 유네스코 세계유산 구역 안에 있다.",
      },
      {
        emoji: "🌄",
        name: "로즈 밸리",
        photo: "https://source.unsplash.com/600x300/?rose,valley,cappadocia,sunset",
        desc: "석양이 질 무렵 분홍·장밋빛으로 물드는 계곡. 깎아지른 붉은 절벽 사이로 트레킹 코스가 잘 정비되어 있다. 일몰 30분 전부터 색이 가장 아름다워 이 시간에 맞춰 가는 것이 포인트.",
      },
    ],
  },
  {
    day: 4,
    date: "5/25 (월)",
    city: "카파도키아",
    badge: "열기구 🎈",
    color: "#D4883E",
    icon: "🎈",
    title: "열기구 + 레드 투어",
    mapUrl: "https://www.google.com/maps/dir/Goreme+Nevsehir+Turkey/Goreme+Open+Air+Museum+Turkey/Devrent+Valley+Cappadocia/Pasabag+Fairy+Chimneys+Cappadocia/Avanos+Nevsehir+Turkey/Kelebek+Special+Cave+Hotel+Goreme",
    mapStops: ["괴레메", "야외박물관", "데브렌트 밸리", "파샤바", "아바노스", "🏨 동굴 호텔"],
    mapSegments: [
      { icon: "🚶", mode: "도보", time: "10분", dist: "800m", tip: "괴레메 마을 북동쪽 오르막길. 표지판 따라 걸어서 이동. 입장료 약 ₺750 별도" },
      { icon: "🚌", mode: "레드 투어 버스", time: "15분", dist: "10km", tip: "투어 차량이 박물관 앞에서 픽업. 별도 이동 불필요 (레드 투어에 포함)" },
      { icon: "🚌", mode: "레드 투어 버스", time: "10분", dist: "7km", tip: "투어 연속 이동. 데브렌트 → 파샤바 버섯바위 (요정 굴뚝)" },
      { icon: "🚌", mode: "레드 투어 버스", time: "15분", dist: "8km", tip: "아바노스는 클즐 으르막 강변 마을. 도자기 체험 후 투어버스로 괴레메 복귀" },
      { icon: "🚶", mode: "도보", time: "5분", dist: "300m", tip: "레드 투어 버스 괴레메 정류장 하차 후 Kelebek Special Cave Hotel까지 마을 중심에서 도보 5분" },
    ],
    items: [
      { time: "04:30", text: "열기구 투어 — 일출과 함께 하늘 위로! (1차 시도)" },
      { time: "07:30", text: "착륙 후 샴페인 축배 & 호텔 복귀" },
      { time: "09:30", text: "레드 투어 — 괴레메 야외박물관, 데브렌트 밸리" },
      { time: "13:00", text: "파샤바 버섯바위, 아바노스 도자기 마을" },
      { time: "19:00", text: "동굴 호텔 테라스에서 별 보며 휴식 ✨" },
    ],
    tip: "열기구 취소 시 → 내일(5/26) 또는 모레(5/27) 재시도. 3번 기회!",
    attractions: [
      {
        emoji: "🎈",
        name: "열기구 투어",
        photo: "https://source.unsplash.com/600x300/?cappadocia,hot,air,balloon",
        desc: "카파도키아 최고의 액티비티. 새벽 4시 반 기상 후 일출과 함께 버섯바위 지대 상공을 약 1시간 비행. 착륙 후 전통적으로 샴페인을 터뜨리는 의식이 있다.",
      },
      {
        emoji: "⛪",
        name: "괴레메 야외박물관",
        photo: "https://source.unsplash.com/600x300/?goreme,open,air,museum,cave,church",
        desc: "유네스코 세계유산. 10~13세기 초기 기독교 수도사들이 화산암 절벽을 직접 파서 만든 동굴 수도원과 교회 군락. 내부에 채색 프레스코화가 잘 보존되어 있다.",
      },
      {
        emoji: "🏔️",
        name: "데브렌트 밸리",
        photo: "https://source.unsplash.com/600x300/?cappadocia,rock,formation,valley",
        desc: "바람과 비에 깎인 기암들이 낙타·독수리·나폴레옹 등 다양한 형태를 닮아 '상상의 계곡'으로 불린다.",
      },
      {
        emoji: "🍄",
        name: "파샤바 버섯바위",
        photo: "https://source.unsplash.com/600x300/?fairy,chimneys,cappadocia",
        desc: "카파도키아를 대표하는 상징적 풍경. 단단한 현무암 모자를 쓴 채 솟아 있는 원뿔형 응회암 기둥들. 과거 수도사들이 이 안을 파고 들어가 생활하기도 했다.",
      },
      {
        emoji: "🏺",
        name: "아바노스 도자기 마을",
        photo: "https://source.unsplash.com/600x300/?pottery,ceramic,turkey,craft",
        desc: "히타이트 시대부터 5,000년 이상의 도자기 역사를 지닌 마을. 인근 강의 붉은 점토로 수제 도자기를 만든다. 공방에서 직접 체험도 가능.",
      },
    ],
  },
  {
    day: 5,
    date: "5/26 (화)",
    city: "카파도키아",
    badge: "액티비티",
    color: "#D4883E",
    icon: "⛰️",
    title: "그린 투어 + 액티비티",
    mapUrl: "https://www.google.com/maps/dir/Derinkuyu+Underground+City+Turkey/Ihlara+Valley+Turkey/Goreme+Nevsehir+Turkey/Kelebek+Special+Cave+Hotel+Goreme",
    mapStops: ["데린쿠유 지하도시", "으흘라라 계곡", "괴레메", "🏨 동굴 호텔"],
    mapSegments: [
      { icon: "🚌", mode: "그린 투어 버스", time: "35분", dist: "30km", tip: "그린 투어 차량이 괴레메 호텔에서 픽업 후 데린쿠유 → 으흘라라 이동. 투어에 포함, 별도 이동 불필요" },
      { icon: "🚌", mode: "그린 투어 버스", time: "50분", dist: "45km", tip: "으흘라라 계곡 종점 → 셀리메 수도원 경유 → 괴레메 호텔 복귀. 계곡 트레킹 3.5km(약 1시간 30분) 후 버스 탑승" },
      { icon: "🚶", mode: "도보", time: "5분", dist: "300m", tip: "투어 버스 괴레메 정류장 하차 후 Kelebek Special Cave Hotel까지 마을 안 골목으로 도보 5분" },
    ],
    items: [
      { time: "04:30", text: "열기구 백업 (어제 취소됐을 경우 2차 시도)" },
      { time: "09:30", text: "그린 투어 — 데린쿠유 지하도시 탐험" },
      { time: "12:00", text: "으흘라라 계곡 하이킹 (3.5km 트레킹)" },
      { time: "15:00", text: "ATV 쿼드바이크 or 승마 투어 🐎" },
      { time: "20:00", text: "괴레메에서 마지막 밤, 터키 아이스크림" },
    ],
    tip: "으흘라라 계곡은 편한 운동화 필수! 물도 넉넉히 챙기세요",
    attractions: [
      {
        emoji: "🕳️",
        name: "데린쿠유 지하도시",
        photo: "https://source.unsplash.com/600x300/?underground,city,cappadocia,tunnel",
        desc: "지하 85m, 18층 규모의 거대 지하 도시. 기원전 8세기경부터 조성된 것으로 추정. 초기 기독교인들이 박해를 피해 수천 명이 생활했던 공간으로, 환기구·우물·교회·마굿간까지 갖추고 있다.",
      },
      {
        emoji: "🏞️",
        name: "으흘라라 계곡",
        photo: "https://source.unsplash.com/600x300/?ihlara,canyon,valley,green,turkey",
        desc: "화산 폭발로 생긴 14km 길이의 협곡. 양쪽 60~80m 높이의 절벽에 수십 개의 동굴 교회가 새겨져 있다. 계곡 바닥을 흐르는 멜렌디즈 강을 따라 3.5km 코스로 하이킹 가능.",
      },
    ],
  },
  {
    day: 6,
    date: "5/27 (수)",
    city: "카파도키아 → 안탈리아",
    badge: "이동 ✈️",
    color: "#2E7D6F",
    icon: "🏖️",
    title: "안탈리아 도착 & 구시가지",
    mapUrl: "https://www.google.com/maps/dir/Antalya+Airport+AYT/Kaleici+Antalya+Turkey/Hadrian+Gate+Antalya+Turkey/Antalya+Old+Harbour+Turkey/Puding+Marina+Residence+Antalya",
    mapStops: ["안탈리아 공항", "칼레이치", "하드리아누스 문", "구항구", "🏨 호텔"],
    mapSegments: [
      { icon: "🚕", mode: "택시 또는 하바쉬 버스", time: "25분", dist: "13km", tip: "공항 → 시내 하바쉬(Havas) 셔틀버스 약 ₺60, 약 30분 소요. 택시는 약 ₺250~350, 25분. 칼레이치 숙소라면 택시가 편리" },
      { icon: "🚶", mode: "도보", time: "3분", dist: "200m", tip: "칼레이치 입구 골목 따라 직진하면 바로 하드리아누스 문 등장. 미로 같은 골목이므로 구글 지도 필수" },
      { icon: "🚶", mode: "도보", time: "5분", dist: "400m", tip: "하드리아누스 문에서 구시가지 골목 내리막을 따라가면 자연스럽게 구항구로 이어짐" },
      { icon: "🚶", mode: "도보", time: "3분", dist: "250m", tip: "구항구에서 성벽 따라 올라가면 Puding Marina Residence 바로 코앞. 구항구 전망 테라스 있는 호텔로 귀환" },
    ],
    items: [
      { time: "04:30", text: "열기구 최종 백업 (아직 못 탔을 경우 3차 시도)" },
      { time: "10:00", text: "국내선으로 안탈리아 이동 (약 1시간 20분)" },
      { time: "13:00", text: "안탈리아 숙소 체크인" },
      { time: "14:30", text: "칼레이치 구시가지 산책 & 하드리아누스 문" },
      { time: "17:00", text: "구항구에서 지중해 감상 & 카페 타임 ☕" },
      { time: "20:00", text: "항구 근처 해산물 레스토랑 디너" },
    ],
    tip: "카이세리(ASR)→안탈리아(AYT) 직항 — 페가수스, 썬익스프레스 운항",
    attractions: [
      {
        emoji: "🏙️",
        name: "칼레이치 구시가지",
        photo: "https://source.unsplash.com/600x300/?kaleici,antalya,old,town",
        desc: "'내부 성곽'이라는 뜻. 로마·비잔틴·셀주크·오스만 시대 건물들이 공존하는 미로 같은 골목길. 오래된 석조 저택들이 부티크 호텔과 카페로 변신해 있어 골목 탐방이 즐겁다.",
      },
      {
        emoji: "🏛️",
        name: "하드리아누스 문",
        photo: "https://source.unsplash.com/600x300/?hadrian,gate,roman,arch,antalya",
        desc: "서기 130년 로마 황제 하드리아누스의 안탈리아 방문을 기념해 건설된 개선문. 2,000년이 지난 지금도 3개의 아치가 원형에 가깝게 보존되어 있다.",
      },
      {
        emoji: "⚓",
        name: "구항구",
        photo: "https://source.unsplash.com/600x300/?antalya,harbor,marina,yacht",
        desc: "2,000년 역사의 로마 시대 항구. 반원형 성벽에 둘러싸인 아담한 항구에 흰색 요트들이 정박해 있고, 특히 석양 무렵 분위기가 아름답다.",
      },
    ],
  },
  {
    day: 7,
    date: "5/28 (목)",
    city: "안탈리아",
    badge: "액티비티",
    color: "#2E7D6F",
    icon: "🚤",
    title: "술루아다 섬 보트투어 or 래프팅",
    mapUrl: "https://www.google.com/maps/dir/Antalya+Turkey/Adrasan+Harbor+Turkey/Suluada+Island+Turkey/Lower+Duden+Falls+Antalya+Turkey/Puding+Marina+Residence+Antalya",
    mapStops: ["🏨 호텔 출발", "아드라산 항구", "술루아다 섬", "두덴 폭포", "🏨 호텔 복귀"],
    mapSegments: [
      { icon: "🚌", mode: "투어 셔틀버스", time: "약 90분", dist: "70km", tip: "보트투어 업체에서 호텔 픽업 서비스 제공 (투어비에 포함). 아드라산은 안탈리아 남서쪽 70km 해안 마을" },
      { icon: "🚢", mode: "보트 (해상)", time: "약 60분", dist: "20km (해상)", tip: "아드라산 항구에서 술루아다 섬까지 보트로 이동. 파도 상태에 따라 시간 변동. 멀미약 미리 복용 권장" },
      { icon: "🚢+🚌", mode: "보트 복귀 + 차량", time: "약 2시간", dist: "항구까지 20km + 이후 12km", tip: "섬 → 아드라산 항구 보트 복귀(1시간) → 차량으로 두덴 폭포 이동(30분). 투어 후 개별 이동이므로 택시 약 ₺200~300" },
      { icon: "🚕", mode: "택시", time: "약 20분", dist: "12km", tip: "두덴 폭포에서 칼레이치 호텔까지 택시. 미터기 기준 약 ₺150~200. 야간이라면 BiTaksi 앱으로 호출 추천" },
    ],
    items: [
      { time: "08:00", text: "호텔 픽업 → 아드라산 항구로 이동" },
      { time: "10:00", text: "술루아다 섬 보트투어 — '튀르키예의 몰디브' 🏝️" },
      { time: "12:00", text: "청록색 바다에서 수영 & 스노클링" },
      { time: "13:00", text: "선상 점심 식사" },
      { time: "17:00", text: "복귀 후 두덴 폭포 석양 감상" },
      { time: "20:00", text: "안탈리아 마지막 밤 디너" },
    ],
    tip: "보트투어 대신 쾨프륄뤼 캐니언 래프팅도 강추! 아드레날린 원하면 이쪽으로",
    attractions: [
      {
        emoji: "🏝️",
        name: "술루아다 섬",
        photo: "https://source.unsplash.com/600x300/?turquoise,sea,island,turkey,clear,water",
        desc: "'튀르키예의 몰디브'로 불리는 작은 무인도. 이례적으로 투명한 에메랄드빛 바다와 새하얀 자갈 해변이 펼쳐진다. 아드라산 항구에서 보트로 약 1시간 거리.",
      },
      {
        emoji: "💧",
        name: "두덴 폭포",
        photo: "https://source.unsplash.com/600x300/?waterfall,cliff,sea,mediterranean",
        desc: "안탈리아 북쪽 12km 지점에서 지중해 해안 절벽으로 직접 떨어지는 폭포. 배를 타고 절벽 아래에서 올려다보거나, 절벽 위 공원에서 내려다보는 두 가지 감상 방법이 있다.",
      },
      {
        emoji: "🌊",
        name: "쾨프륄뤼 캐니언 래프팅",
        photo: "https://source.unsplash.com/600x300/?rafting,canyon,river,adventure",
        desc: "안탈리아 내륙 쾨프룰뤼 국립공원 내 협곡에서 즐기는 래프팅. 18km의 급류 코스. 협곡 양쪽에 로마 시대 돌다리도 볼 수 있다.",
      },
    ],
  },
  {
    day: 8,
    date: "5/29 (금)",
    city: "안탈리아",
    badge: "자유일정",
    color: "#2E7D6F",
    icon: "🌊",
    title: "해변 휴식 & 여유로운 하루",
    mapUrl: "https://www.google.com/maps/dir/Konyaalti+Beach+Antalya+Turkey/Antalya+Museum+Turkey/Kaleici+Antalya+Turkey/Puding+Marina+Residence+Antalya",
    mapStops: ["콘야알티 해변", "안탈리아 박물관", "칼레이치", "🏨 호텔"],
    mapSegments: [
      { icon: "🚶", mode: "도보", time: "5분", dist: "400m", tip: "콘야알티 해변 동쪽 끝자락에 안탈리아 박물관이 바로 인접해 있음. 해변에서 걸어서 이동 가능" },
      { icon: "🚃", mode: "트램 또는 택시", time: "20분", dist: "5km", tip: "안탈리아 트램(Antalya Tramvay) Müze 역 탑승 → Atatürk 방향 → 칼레이치 인근 하차. 트램 약 ₺15. 택시는 약 ₺100~150" },
      { icon: "🚶", mode: "도보", time: "약 5분", dist: "350m", tip: "칼레이치 쇼핑 후 구항구 방향으로 내려오면 Puding Marina Residence 바로 앞. 도보 5분 이내 귀환 가능" },
    ],
    items: [
      { time: "09:00", text: "콘야알티 해변에서 지중해 수영 & 일광욕" },
      { time: "12:00", text: "안탈리아 박물관 방문 (고대 유물 컬렉션)" },
      { time: "14:00", text: "하맘(터키식 목욕) 체험으로 여행 피로 풀기 🧖" },
      { time: "16:00", text: "칼레이치에서 기념품 쇼핑" },
      { time: "20:00", text: "마지막 밤 — 루프탑 바에서 지중해 야경" },
    ],
    tip: "내일 아침 일찍 출발! 짐 미리 정리해두세요",
    attractions: [
      {
        emoji: "🏖️",
        name: "콘야알티 해변",
        photo: "https://source.unsplash.com/600x300/?konyaalti,beach,antalya,mediterranean",
        desc: "안탈리아 최대 해변. 7km에 달하는 자갈 해변으로, 뒤로는 토로스 산맥이 병풍처럼 펼쳐지는 절경이다. 비치 클럽과 편의시설이 잘 갖춰져 있으며 물이 맑고 투명하다.",
      },
      {
        emoji: "🏺",
        name: "안탈리아 박물관",
        photo: "https://source.unsplash.com/600x300/?archaeology,museum,ancient,statue,turkey",
        desc: "터키 최고 수준의 고고학 박물관 중 하나. 리키아·프리지아·로마 시대 유물과 조각상이 방대하게 소장되어 있다.",
      },
      {
        emoji: "🧖",
        name: "하맘 (터키식 목욕)",
        photo: "https://source.unsplash.com/600x300/?hammam,turkish,bath,spa,marble",
        desc: "수백 년 역사의 터키 전통 목욕 문화. 대리석 욕실에서 온열 찜질 후, 케세(때수건 마사지)와 쾨퓌크(거품 마사지)를 받는다. 여행 피로를 한 방에 날려준다.",
      },
    ],
  },
  {
    day: 9,
    date: "5/30 (토)",
    city: "안탈리아 → 이스탄불 → 인천",
    badge: "귀국 ✈️",
    color: "#4A7C8E",
    icon: "✈️",
    title: "이스탄불 환승 → 인천",
    mapUrl: "https://www.google.com/maps/dir/Antalya+Airport+AYT+Turkey/Istanbul+Airport+IST+Turkey",
    mapStops: ["안탈리아 공항", "이스탄불 공항", "인천 도착"],
    mapSegments: [
      { icon: "✈️", mode: "국내선 (터키항공 등)", time: "1시간 15분", dist: "440km", tip: "페가수스(PC) 또는 터키항공(TK) 탑승. 아시아나(OZ)와 공동 수하물 연결 원하면 TK 필수. 공항 2시간 전 도착 권장" },
      { icon: "✈️", mode: "국제선 (아시아나 OZ0552)", time: "9시간 50분", dist: "약 8,800km", tip: "이스탄불 도착 후 국제선 환승. 터미널 내 이동이므로 3시간 여유 확보 필수. 탑승 전 면세 쇼핑 가능" },
    ],
    items: [
      { time: "08:00", text: "안탈리아 공항으로 이동" },
      { time: "~10:00", text: "터키항공 국내선 → 이스탄불 (약 1시간 15분)" },
      { time: "~12:00", text: "이스탄불 공항 도착, 국제선 환승" },
      { time: "14:00", text: "면세점 쇼핑 & 라운지 휴식" },
      { time: "17:30", text: "아시아나 OZ 0552 이스탄불 출발" },
    ],
    tip: "터키항공 국내선이면 아시아나와 수하물 자동 연결! 환승 3시간+ 확보 필수",
    attractions: [
      {
        emoji: "🛍️",
        name: "이스탄불 공항 면세점",
        photo: "https://source.unsplash.com/600x300/?airport,duty,free,shopping",
        desc: "세계 최대 규모의 공항 면세구역 중 하나. 터키산 로쿰(젤리), 올리브 오일, 도자기, 스카프, 명품 브랜드까지 다양하다.",
      },
    ],
  },
  {
    day: 10,
    date: "5/31 (일)",
    city: "인천",
    badge: "도착",
    color: "#4A7C8E",
    icon: "🏠",
    title: "인천 도착",
    mapUrl: null,
    mapStops: [],
    mapSegments: [],
    items: [
      { time: "09:20", text: "인천국제공항 도착 🇰🇷" },
    ],
    tip: null,
    attractions: [],
  },
];

const flights = [
  { route: "인천 → 이스탄불", code: "OZ 0551", time: "5/22 10:25→16:10", duration: "11h 45m" },
  { route: "이스탄불 → 카파도키아", code: "TK 국내선", time: "5/24 오전", duration: "~1h 20m" },
  { route: "카파도키아 → 안탈리아", code: "PC/XQ 국내선", time: "5/27 오전", duration: "~1h 20m" },
  { route: "안탈리아 → 이스탄불", code: "TK 국내선", time: "5/30 오전", duration: "~1h 15m" },
  { route: "이스탄불 → 인천", code: "OZ 0552", time: "5/30 17:30→5/31 09:20", duration: "9h 50m" },
];

const checklist = [
  { cat: "옷차림", items: "반팔+가벼운 겉옷, 모스크용 스카프, 편한 운동화" },
  { cat: "환전", items: "달러/유로 → 현지에서 리라 교환. 트래블카드 병행" },
  { cat: "사전예약", items: "열기구(2~3주 전), 국내선 3편, 술루아다 보트투어" },
  { cat: "준비물", items: "선크림, 선글라스, 물병, 수영복, 경량 패딩(열기구용)" },
];

const hotels = [
  {
    city: "이스탄불",
    color: "#C4573A",
    icon: "🕌",
    nights: "2박 (5/22~5/24)",
    area: "술탄아흐메트 지구 추천",
    picks: [
      { name: "Hotel Arcadia Blue Istanbul", type: "부티크 호텔", price: "₩80,000~110,000", point: "아야 소피아·블루 모스크 도보 5분. 루프탑에서 두 건물 동시 조망 가능.", tag: "뷰 맛집" },
      { name: "Sura Hagia Sophia Hotel", type: "부티크 호텔", price: "₩90,000~120,000", point: "술탄아흐메트 중심가. 커플 조용한 분위기. 아야 소피아까지 도보 2분.", tag: "중심가 위치" },
      { name: "Agora Life Hotel", type: "게스트하우스", price: "₩60,000~80,000", point: "그랜드 바자르 도보 10분. 가성비 최고. 더블룸 깔끔.", tag: "가성비" },
    ],
  },
  {
    city: "카파도키아",
    color: "#D4883E",
    icon: "🎈",
    nights: "3박 (5/24~5/27)",
    area: "괴레메 마을 동굴 호텔 추천",
    picks: [
      { name: "Kelebek Special Cave Hotel", type: "동굴 호텔 ★", price: "₩90,000~130,000", point: "30년 역사 유명 동굴 호텔. 화산암 객실 + 테라스에서 열기구 뷰. 커플에게 최고 인기.", tag: "커플 픽" },
      { name: "Cappadocia Cave Suites", type: "동굴 호텔", price: "₩100,000~140,000", point: "괴레메 뷰 테라스 보유. 야외 수영장 있음. 열기구 뷰가 SNS 핫플로 유명.", tag: "SNS 핫플" },
      { name: "Travellers Cave Hotel", type: "동굴 게스트하우스", price: "₩55,000~75,000", point: "가성비 동굴 숙소. 괴레메 중심가 위치. 커플 더블룸 아늑한 동굴 분위기.", tag: "가성비" },
    ],
  },
  {
    city: "안탈리아",
    color: "#2E7D6F",
    icon: "🏖️",
    nights: "3박 (5/27~5/30)",
    area: "칼레이치 구시가지 or 해변가 추천",
    picks: [
      { name: "Puding Marina Residence", type: "부티크 호텔", price: "₩80,000~110,000", point: "구항구 바로 앞. 지중해 뷰 테라스. 로맨틱한 분위기로 커플 강추.", tag: "커플 픽" },
      { name: "Alp Pasa Boutique Hotel", type: "부티크 호텔", price: "₩85,000~115,000", point: "칼레이치 중심 오스만 시대 저택 개조. 중정 정원이 아름다운 숨은 명소.", tag: "분위기 맛집" },
      { name: "Ani Boutique Hotel", type: "게스트하우스", price: "₩50,000~70,000", point: "칼레이치 골목 안 아담한 숙소. 가성비 최고. 주인이 친절해 여행 팁 풍부.", tag: "가성비" },
    ],
  },
];

const modeColors = {
  "🚶": "#6B8E6B",
  "🚇": "#3A72B8",
  "🚃": "#3A72B8",
  "🚌": "#D4883E",
  "🚕": "#C4A020",
  "🚢": "#2E7D6F",
  "🚢+🚌": "#2E7D6F",
  "✈️": "#4A7C8E",
};

const cityColors = {
  "이스탄불": "#C4573A",
  "카파도키아": "#D4883E",
  "안탈리아": "#2E7D6F",
};

export default function TurkeyItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [showFlights, setShowFlights] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showAttractions, setShowAttractions] = useState(false);
  const [showHotels, setShowHotels] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const current = days[activeDay];

  const handleImgError = (key) => {
    setImgErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div style={{
      fontFamily: "'Noto Sans KR', 'Pretendard', sans-serif",
      background: "linear-gradient(160deg, #FFF9F5 0%, #FFF3EC 50%, #FFF8F5 100%)",
      color: "#2C1A12",
      minHeight: "100vh",
      padding: "0",
    }}>

      {/* Header */}
      <div style={{
        padding: "28px 24px 20px",
        background: "linear-gradient(180deg, rgba(196,87,58,0.08) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(196,87,58,0.12)",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#C4573A",
            margin: 0,
            letterSpacing: "-0.5px",
          }}>Türkiye</h1>
          <span style={{ fontSize: "14px", color: "#A08070", fontWeight: 400 }}>8박 10일</span>
        </div>
        <p style={{ fontSize: "13px", color: "#9A7A6A", margin: "4px 0 0" }}>
          이스탄불 2박 → 카파도키아 3박 → 안탈리아 3박 → 이스탄불 환승
        </p>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {Object.entries(cityColors).map(([city, color]) => (
            <span key={city} style={{
              fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
              background: color + "18", color, border: `1px solid ${color}35`, fontWeight: 600,
            }}>
              {city === "이스탄불" ? "🕌" : city === "카파도키아" ? "🎈" : "🏖️"} {city}
            </span>
          ))}
        </div>
      </div>

      {/* Day selector */}
      <div style={{
        display: "flex", gap: "6px", padding: "16px 24px",
        overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
        background: "#FFFFFF", borderBottom: "1px solid rgba(196,87,58,0.08)",
      }}>
        {days.map((d, i) => (
          <button key={i} onClick={() => { setActiveDay(i); setShowAttractions(false); setShowMap(false); }} style={{
            flexShrink: 0, padding: "8px 14px", borderRadius: "12px",
            border: activeDay === i ? `1.5px solid ${d.color}` : "1.5px solid rgba(196,87,58,0.15)",
            background: activeDay === i ? d.color : "#FFFFFF",
            color: activeDay === i ? "#FFFFFF" : "#9A7A6A",
            fontSize: "12px", fontWeight: activeDay === i ? 700 : 400, cursor: "pointer",
            transition: "all 0.2s", display: "flex", flexDirection: "column",
            alignItems: "center", gap: "2px", minWidth: "52px",
            boxShadow: activeDay === i ? `0 4px 12px ${d.color}40` : "none",
          }}>
            <span style={{ fontSize: "16px" }}>{d.icon}</span>
            <span>D{d.day}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ padding: "0 24px 20px" }}>

        {/* Day header */}
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{
              fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
              background: current.color + "20", color: current.color,
              fontWeight: 700, border: `1px solid ${current.color}30`,
            }}>{current.badge}</span>
            <span style={{ fontSize: "12px", color: "#9A7A6A" }}>{current.date}</span>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#2C1A12", margin: "4px 0 2px", lineHeight: 1.4 }}>
            {current.title}
          </h2>
          <p style={{ fontSize: "12px", color: "#9A7A6A", margin: 0 }}>{current.city}</p>
        </div>

        {/* Route card */}
        {current.mapUrl && current.mapStops.length > 0 && (
          <div style={{
            background: "#FFFFFF", borderRadius: "16px", padding: "16px",
            marginBottom: "12px", boxShadow: "0 2px 12px rgba(46,125,111,0.1)",
            border: "1px solid rgba(46,125,111,0.15)",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#2C1A12" }}>🗺️ 오늘의 이동 경로</span>
              <a href={current.mapUrl} target="_blank" rel="noopener noreferrer" style={{
                fontSize: "11px", fontWeight: 600, color: "#FFFFFF", background: "#34A853",
                padding: "5px 12px", borderRadius: "20px", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "4px", flexShrink: 0,
              }}>구글 지도 ↗</a>
            </div>

            {/* Row 1: circles + lines */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {current.mapStops.flatMap((stop, i) => {
                const items = [
                  <div key={`c-${i}`} style={{ width: "56px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: i === 0 || i === current.mapStops.length - 1 ? current.color : current.color + "28",
                      border: `2px solid ${current.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 700,
                      color: i === 0 || i === current.mapStops.length - 1 ? "#FFFFFF" : current.color,
                    }}>{i + 1}</div>
                  </div>
                ];
                if (i < current.mapStops.length - 1) {
                  items.push(
                    <div key={`l-${i}`} style={{
                      flex: "1 1 0", minWidth: "12px", height: "2px",
                      background: `linear-gradient(90deg, ${current.color}, ${current.color}50)`,
                      borderRadius: "2px",
                    }} />
                  );
                }
                return items;
              })}
            </div>

            {/* Row 2: labels */}
            <div style={{ display: "flex", alignItems: "flex-start", marginTop: "6px" }}>
              {current.mapStops.flatMap((stop, i) => {
                const items = [
                  <div key={`t-${i}`} style={{
                    width: "56px", flexShrink: 0, textAlign: "center",
                    fontSize: "9px", color: "#5A3A28", fontWeight: 500,
                    lineHeight: 1.4, wordBreak: "keep-all",
                  }}>{stop}</div>
                ];
                if (i < current.mapStops.length - 1) {
                  items.push(<div key={`s-${i}`} style={{ flex: "1 1 0", minWidth: "12px" }} />);
                }
                return items;
              })}
            </div>

            {/* Segment details */}
            {current.mapSegments && current.mapSegments.length > 0 && (
              <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {current.mapSegments.map((seg, i) => {
                  const segColor = modeColors[seg.icon] || "#7A6558";
                  return (
                    <div key={i} style={{
                      display: "flex", gap: "10px", alignItems: "flex-start",
                      padding: "10px 12px", background: "#F9F5F2",
                      borderRadius: "10px", border: `1px solid ${segColor}18`,
                    }}>
                      {/* Left: icon + stop numbers */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", flexShrink: 0 }}>
                        <span style={{ fontSize: "18px", lineHeight: 1 }}>{seg.icon}</span>
                        <span style={{
                          fontSize: "9px", color: "#FFFFFF", background: segColor,
                          borderRadius: "8px", padding: "1px 5px", fontWeight: 700, whiteSpace: "nowrap",
                        }}>{i + 1}→{i + 2}</span>
                      </div>
                      {/* Right: content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#2C1A12" }}>
                            {current.mapStops[i]} → {current.mapStops[i + 1]}
                          </span>
                          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                            <span style={{
                              fontSize: "10px", fontWeight: 700, color: segColor,
                              background: segColor + "18", padding: "2px 7px", borderRadius: "6px",
                            }}>⏱ {seg.time}</span>
                            <span style={{
                              fontSize: "10px", fontWeight: 600, color: "#7A6558",
                              background: "rgba(0,0,0,0.05)", padding: "2px 7px", borderRadius: "6px",
                            }}>📍 {seg.dist}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: "10px", color: "#7A6558", marginBottom: "4px", fontWeight: 600 }}>
                          {seg.mode}
                        </div>
                        <div style={{ fontSize: "11px", color: "#5A4A40", lineHeight: 1.6 }}>{seg.tip}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Timeline card */}
        <div style={{
          background: "#FFFFFF", borderRadius: "16px", padding: "18px 16px",
          boxShadow: "0 2px 16px rgba(196,87,58,0.08)", border: "1px solid rgba(196,87,58,0.1)",
        }}>
          <div style={{ position: "relative", paddingLeft: "20px" }}>
            <div style={{
              position: "absolute", left: "5px", top: "8px", bottom: "8px", width: "2px",
              background: `linear-gradient(180deg, ${current.color} 0%, ${current.color}25 100%)`,
              borderRadius: "2px",
            }} />
            {current.items.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < current.items.length - 1 ? "18px" : "0", paddingLeft: "16px" }}>
                <div style={{
                  position: "absolute", left: "-18px", top: "5px",
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: i === 0 ? current.color : "#FFFFFF",
                  border: `2px solid ${current.color}`,
                  boxShadow: i === 0 ? `0 0 0 3px ${current.color}20` : "none",
                }} />
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{
                    fontSize: "11px", color: current.color, fontWeight: 700,
                    minWidth: "42px", flexShrink: 0, paddingTop: "1px", fontVariantNumeric: "tabular-nums",
                  }}>{item.time}</span>
                  <span style={{ fontSize: "13px", color: "#4A2E22", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        {current.tip && (
          <div style={{
            marginTop: "12px", padding: "14px 16px", borderRadius: "12px",
            background: current.color + "10", border: `1px solid ${current.color}25`,
            fontSize: "12px", color: "#5A3A28", lineHeight: 1.7,
          }}>
            <span style={{ fontWeight: 700, color: current.color }}>💡 TIP  </span>
            {current.tip}
          </div>
        )}

        {/* Attractions section */}
        {current.attractions && current.attractions.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <button onClick={() => setShowAttractions(!showAttractions)} style={{
              width: "100%", padding: "14px 16px", borderRadius: "14px",
              background: "#FFFFFF", border: `1px solid ${current.color}25`,
              color: current.color, fontSize: "13px", fontWeight: 600, cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 2px 8px rgba(196,87,58,0.08)",
            }}>
              <span>📍 관광지 설명 ({current.attractions.length}곳)</span>
              <span style={{ fontSize: "16px", transition: "transform 0.2s", transform: showAttractions ? "rotate(180deg)" : "rotate(0)", display: "inline-block" }}>⌄</span>
            </button>
            {showAttractions && (
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {current.attractions.map((a, i) => {
                  const imgKey = `${activeDay}-${i}`;
                  return (
                    <div key={i} style={{
                      background: "#FFFFFF", borderRadius: "16px", overflow: "hidden",
                      border: `1px solid ${current.color}18`, boxShadow: "0 2px 12px rgba(196,87,58,0.07)",
                    }}>
                      {!imgErrors[imgKey] ? (
                        <img src={a.photo} alt={a.name} onError={() => handleImgError(imgKey)}
                          style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} />
                      ) : (
                        <div style={{
                          width: "100%", height: "100px",
                          background: `linear-gradient(135deg, ${current.color}20, ${current.color}45)`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px",
                        }}>{a.emoji}</div>
                      )}
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ fontSize: "18px" }}>{a.emoji}</span>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: current.color }}>{a.name}</span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#5A3A28", lineHeight: 1.8, margin: 0 }}>{a.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Flights section */}
      <div style={{ padding: "0 24px 12px" }}>
        <button onClick={() => setShowFlights(!showFlights)} style={{
          width: "100%", padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF",
          border: "1px solid rgba(196,87,58,0.15)", color: "#C4573A", fontSize: "13px",
          fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between",
          alignItems: "center", boxShadow: "0 2px 8px rgba(196,87,58,0.08)",
        }}>
          <span>✈️ 항공편 정리 (국내선 3편 + 국제선 2편)</span>
          <span style={{ fontSize: "16px", transition: "transform 0.2s", transform: showFlights ? "rotate(180deg)" : "rotate(0)", display: "inline-block" }}>⌄</span>
        </button>
        {showFlights && (
          <div style={{ marginTop: "8px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(196,87,58,0.12)", overflow: "hidden", boxShadow: "0 2px 12px rgba(196,87,58,0.08)" }}>
            {flights.map((f, i) => (
              <div key={i} style={{ padding: "13px 16px", borderBottom: i < flights.length - 1 ? "1px solid rgba(196,87,58,0.08)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#2C1A12", fontWeight: 500 }}>{f.route}</div>
                  <div style={{ fontSize: "11px", color: "#A08070", marginTop: "2px" }}>{f.code} · {f.time}</div>
                </div>
                <span style={{ fontSize: "11px", color: "#C4573A", padding: "4px 10px", background: "rgba(196,87,58,0.08)", borderRadius: "8px", fontWeight: 600 }}>{f.duration}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map section */}
      {["이스탄불", "카파도키아", "안탈리아"].some(c => current.city.includes(c)) && (
        <div style={{ padding: "0 24px 12px" }}>
          <button onClick={() => setShowMap(!showMap)} style={{
            width: "100%", padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF",
            border: "1px solid rgba(52,168,83,0.3)", color: "#34A853", fontSize: "13px",
            fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between",
            alignItems: "center", boxShadow: "0 2px 8px rgba(52,168,83,0.1)",
          }}>
            <span>📌 숙소 & 맛집 지도</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", color: "#888", fontWeight: 400 }}>
                🏨 숙소 3곳 · 🍽️ 맛집 4~5곳
              </span>
              <span style={{ fontSize: "16px", transition: "transform 0.2s", transform: showMap ? "rotate(180deg)" : "rotate(0)", display: "inline-block" }}>⌄</span>
            </div>
          </button>

          {showMap && (
            <div style={{ marginTop: "8px" }}>
              {/* 범례 */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "10px", padding: "10px 14px", background: "#FFFFFF", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#5A3A28" }}>
                  <span style={{ fontSize: "16px" }}>🏨</span> 숙소 추천
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#5A3A28" }}>
                  <span style={{ fontSize: "16px" }}>🍽️</span> 맛집 추천
                </div>
                <div style={{ fontSize: "11px", color: "#A08070", marginLeft: "auto" }}>핀 클릭 시 상세 정보</div>
              </div>

              {/* 지도 */}
              <div style={{ borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <Suspense fallback={
                  <div style={{ height: "340px", background: "#F0F4F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#888" }}>
                    지도 불러오는 중...
                  </div>
                }>
                  <CityMap
                    city={["이스탄불", "카파도키아", "안탈리아"].find(c => current.city.includes(c))}
                    color={current.color}
                  />
                </Suspense>
              </div>

              {/* 맛집 리스트 */}
              {(() => {
                const cityKey = ["이스탄불", "카파도키아", "안탈리아"].find(c => current.city.includes(c));
                const restaurants = cityMapData[cityKey]?.restaurants || [];
                return (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#2C1A12", marginBottom: "8px", paddingLeft: "2px" }}>🍽️ 추천 맛집</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {restaurants.map((r, i) => (
                        <div key={i} style={{ background: "#FFFFFF", borderRadius: "12px", padding: "12px 14px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#C4573A" }}>🍽️ {r.name}</div>
                            <span style={{ fontSize: "10px", color: current.color, background: current.color + "15", padding: "2px 8px", borderRadius: "20px", fontWeight: 600, flexShrink: 0, marginLeft: "8px" }}>{r.price}</span>
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "#888", marginBottom: "4px" }}>{r.category}</div>
                          <div style={{ fontSize: "11px", color: "#555", lineHeight: 1.6 }}>{r.desc}</div>
                          {r.menu && (
                            <div style={{ marginTop: "6px", fontSize: "11px", color: "#888" }}>
                              <strong>추천 메뉴:</strong> {r.menu}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Hotels section */}
      <div style={{ padding: "0 24px 12px" }}>
        <button onClick={() => setShowHotels(!showHotels)} style={{
          width: "100%", padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF",
          border: "1px solid rgba(196,87,58,0.15)", color: "#C4573A", fontSize: "13px",
          fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between",
          alignItems: "center", boxShadow: "0 2px 8px rgba(196,87,58,0.08)",
        }}>
          <span>🏨 숙소 추천 (커플 · 1박 ~10만원)</span>
          <span style={{ fontSize: "16px", transition: "transform 0.2s", transform: showHotels ? "rotate(180deg)" : "rotate(0)", display: "inline-block" }}>⌄</span>
        </button>
        {showHotels && (
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {hotels.map((h, hi) => (
              <div key={hi} style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: `1px solid ${h.color}20`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ padding: "12px 16px", background: h.color + "12", borderBottom: `1px solid ${h.color}20`, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "18px" }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: h.color }}>{h.city}</div>
                    <div style={{ fontSize: "11px", color: "#9A7A6A", marginTop: "1px" }}>{h.nights} · {h.area}</div>
                  </div>
                </div>
                {h.picks.map((p, pi) => (
                  <div key={pi} style={{ padding: "13px 16px", borderBottom: pi < h.picks.length - 1 ? `1px solid ${h.color}10` : "none" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "5px", gap: "8px" }}>
                      <div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#2C1A12" }}>{p.name}</span>
                        <span style={{ fontSize: "10px", color: "#9A7A6A", marginLeft: "6px" }}>{p.type}</span>
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#FFFFFF", background: pi === 0 ? h.color : "#A08070", padding: "2px 8px", borderRadius: "20px", flexShrink: 0 }}>{p.tag}</span>
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: h.color, marginBottom: "4px" }}>{p.price} / 1박</div>
                    <div style={{ fontSize: "11px", color: "#6A4A38", lineHeight: 1.6 }}>{p.point}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checklist section */}
      <div style={{ padding: "0 24px 32px" }}>
        <button onClick={() => setShowChecklist(!showChecklist)} style={{
          width: "100%", padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF",
          border: "1px solid rgba(196,87,58,0.15)", color: "#C4573A", fontSize: "13px",
          fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between",
          alignItems: "center", boxShadow: "0 2px 8px rgba(196,87,58,0.08)",
        }}>
          <span>📋 준비 체크리스트</span>
          <span style={{ fontSize: "16px", transition: "transform 0.2s", transform: showChecklist ? "rotate(180deg)" : "rotate(0)", display: "inline-block" }}>⌄</span>
        </button>
        {showChecklist && (
          <div style={{ marginTop: "8px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(196,87,58,0.12)", overflow: "hidden", boxShadow: "0 2px 12px rgba(196,87,58,0.08)" }}>
            {checklist.map((c, i) => (
              <div key={i} style={{ padding: "13px 16px", borderBottom: i < checklist.length - 1 ? "1px solid rgba(196,87,58,0.08)" : "none" }}>
                <div style={{ fontSize: "12px", color: "#C4573A", fontWeight: 700, marginBottom: "4px" }}>{c.cat}</div>
                <div style={{ fontSize: "12px", color: "#6A4A38", lineHeight: 1.6 }}>{c.items}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px 28px", borderTop: "1px solid rgba(196,87,58,0.1)", textAlign: "center", background: "rgba(196,87,58,0.03)" }}>
        <p style={{ fontSize: "11px", color: "#A08070", lineHeight: 1.7, margin: 0 }}>
          ⚠️ 마지막 날 안탈리아→이스탄불 국내선은 터키항공(TK) 예약 시<br/>
          아시아나(OZ)와 수하물 자동 연결 · 환승 3시간+ 확보 필수
        </p>
      </div>
    </div>
  );
}
