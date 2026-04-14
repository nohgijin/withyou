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
        photos: [
          "https://source.unsplash.com/800x500/?istiklal,istanbul,street",
          "https://source.unsplash.com/800x500/?istanbul,tram,nostalgic",
          "https://source.unsplash.com/800x500/?istanbul,beyoglu,night",
        ],
        desc: "이스탄불 최대 번화가이자 유럽 지구(베이오을루)의 심장부. 1.4km 길이의 보행자 전용 거리로 19세기에 지어진 유럽풍 석조 건물들이 양쪽으로 늘어서 있다. 1871년부터 운행된 빨간 클래식 노면전차(T2 라인)가 거리 중앙을 오가며 독특한 분위기를 연출한다. 낮에는 카페·레스토랑·부티크 쇼핑을, 저녁에는 라이브 버스킹과 활기찬 분위기를 만끽할 수 있다. 갈라타사라이 고등학교 주변 골목에 현지인들이 즐겨 찾는 숨은 카페들이 밀집해 있다.",
        details: { hours: "24시간 개방 (상점 10:00~22:00)", price: "무료", tip: "갈라타사라이 광장 뒤편 골목이 현지 카페 숨은 명소. 노면전차는 사진 찍을 때만 조심하면 됨" },
      },
      {
        emoji: "🗼",
        name: "갈라타 탑",
        photos: [
          "https://source.unsplash.com/800x500/?galata,tower,istanbul",
          "https://source.unsplash.com/800x500/?galata,istanbul,night",
          "https://source.unsplash.com/800x500/?bosphorus,istanbul,view",
        ],
        desc: "1348년 제노바 상인들이 무역 거점 보호를 위해 세운 67m 높이의 원통형 석탑. 당시 이스탄불에서 가장 높은 건축물이었다. 오스만 시대에는 화재 감시탑, 감옥 등으로 쓰였다. 전망대에서는 골든혼, 보스포루스 해협, 아야 소피아·블루 모스크의 돔과 첨탑이 360도 파노라마로 펼쳐진다. 해질 무렵 조명이 켜지면 외관이 황금빛으로 빛나 야경도 아름답다.",
        details: { hours: "08:30~22:00", price: "약 ₺500 (약 ₩22,000)", tip: "주말 성수기 1~2시간 대기. 온라인 사전 예매 필수. 꼭대기 전망대는 바람이 세니 겉옷 챙기기" },
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
    mapUrl: "https://www.google.com/maps/dir/Hotel+Arcadia+Blue+Istanbul/Hagia+Sophia+Istanbul/Blue+Mosque+Istanbul/Topkapi+Palace+Istanbul/Grand+Bazaar+Istanbul/Galata+Bridge+Istanbul/Hotel+Arcadia+Blue+Istanbul",
    mapStops: ["🏨 호텔 출발", "아야 소피아", "블루 모스크", "톱카프 궁전", "그랜드 바자르", "보스포루스", "🏨 호텔"],
    mapSegments: [
      { icon: "🚶", mode: "도보", time: "5분", dist: "350m", tip: "Hotel Arcadia Blue Istanbul에서 아야 소피아 정문까지 도보 5분. 술탄아흐메트 광장을 가로질러 직진" },
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
        photos: [
          "https://source.unsplash.com/800x500/?hagia,sophia,istanbul",
          "https://source.unsplash.com/800x500/?hagia,sophia,interior,dome",
          "https://source.unsplash.com/800x500/?byzantine,mosaic,istanbul",
        ],
        desc: "537년 완공된 비잔틴 제국의 걸작으로, 천 년 이상 세계 최대 성당이었다. 유스티니아누스 황제가 5년에 걸쳐 건설했으며, 지름 31m·높이 55m의 거대한 돔은 '하늘에 떠 있는 것처럼 보인다'는 기록이 남아 있다. 1453년 오스만 정복 이후 모스크로 개조되었고, 1934년 박물관 전환 후 2020년 다시 모스크로 환원돼 현재 예배가 진행 중이다. 비잔틴 황금 모자이크와 이슬람 캘리그래피 원판이 공존하는 내부가 압도적이다.",
        details: { hours: "09:00~17:00 (예배 시간 외)", price: "무료 (외국인도 입장 가능)", tip: "금요일 정오 예배 시간엔 입장 제한. 어깨·무릎 가리는 복장 필수. 여성은 스카프 착용" },
      },
      {
        emoji: "🕌",
        name: "블루 모스크 (술탄 아흐메트 모스크)",
        photos: [
          "https://source.unsplash.com/800x500/?blue,mosque,istanbul",
          "https://source.unsplash.com/800x500/?sultan,ahmed,mosque,interior",
          "https://source.unsplash.com/800x500/?blue,mosque,courtyard,istanbul",
        ],
        desc: "1616년 완공. 세계 유일의 6첨탑 모스크로, 당시 메카 성원과 같은 수의 첨탑을 세웠다 해서 논란이 되기도 했다. 내부를 장식한 2만 개 이상의 이즈닉 블루 타일이 외광과 어우러져 신비로운 분위기를 만들어낸다. 아야 소피아와 200m 거리라 두 건물을 함께 보는 것이 이스탄불 여행의 하이라이트. 현재도 하루 5회 기도 시간에 아잔이 울린다.",
        details: { hours: "09:00~17:00 (예배 시간 제외)", price: "무료", tip: "예배 시간 30분 전후로 관광 입장 불가. 신발은 입구에서 벗어야 함. 복장 규정 엄격히 적용" },
      },
      {
        emoji: "👑",
        name: "톱카프 궁전",
        photos: [
          "https://source.unsplash.com/800x500/?topkapi,palace,istanbul",
          "https://source.unsplash.com/800x500/?topkapi,palace,courtyard",
          "https://source.unsplash.com/800x500/?ottoman,palace,treasure,istanbul",
        ],
        desc: "1465년부터 약 400년간 오스만 제국 술탄의 행정·거주 본부. 4개의 정원으로 구성되며 총면적 70만㎡에 달한다. 보물 전시관에는 에메랄드 단검(86캐럿 다이아몬드 장식)·세계 최대 에메랄드 원석·스푼장이의 다이아몬드(86캐럿)가 보관되어 있으며, 선지자 무함마드의 망토·검·이빨 등 이슬람 유물도 전시 중이다. 하렘 구역은 별도 입장권이 필요하며 오스만 황실의 내밀한 생활상을 엿볼 수 있다.",
        details: { hours: "09:00~18:45 (화요일 휴관)", price: "약 ₺1,200 / 하렘 별도 ₺500", tip: "무조건 사전 온라인 예매. 당일 현장 매표소는 2~3시간 대기 각오. 하렘은 별도 예매 필수" },
      },
      {
        emoji: "🏪",
        name: "그랜드 바자르",
        photos: [
          "https://source.unsplash.com/800x500/?grand,bazaar,istanbul",
          "https://source.unsplash.com/800x500/?turkish,lamp,bazaar",
          "https://source.unsplash.com/800x500/?istanbul,spice,market",
        ],
        desc: "1461년 개장한 세계 최대 실내 시장 중 하나. 64개 골목에 4,000개 이상의 상점이 가득하다. 카펫·도자기·터키 세잔 램프·향신료·가죽·금세공품이 넘쳐나며, 흥정은 기본 문화다. 처음 제시 가격의 50~70%에서 협상을 시작하는 것이 불문율. 미로 같은 골목에서 길을 잃어도 그것 자체가 구경거리다. 나오는 길에 이집션 바자르(향신료 시장)도 함께 둘러보자.",
        details: { hours: "09:00~19:00 (일요일 휴무)", price: "무료 입장", tip: "현금(리라)이 협상에 유리. 카드도 되지만 흥정력 감소. 가격표 없는 물건은 무조건 흥정 가능" },
      },
      {
        emoji: "🚢",
        name: "보스포루스 해협 크루즈",
        photos: [
          "https://source.unsplash.com/800x500/?bosphorus,istanbul,boat",
          "https://source.unsplash.com/800x500/?istanbul,golden,horn,sunset",
          "https://source.unsplash.com/800x500/?dolmabahce,palace,bosphorus",
        ],
        desc: "유럽과 아시아 대륙을 가르는 31km 해협을 배 위에서 유람. 돌마바흐체 궁전, 루멜리 히사르 요새, 베일레르베이 궁전, 보스포루스 대교 등 연안 볼거리가 풍부하다. 공공 페리(에미뇌뉘 출발, ₺40 내외)부터 선상 디너 크루즈(₺500~2,000)까지 다양한 옵션이 있다. 석양 무렵 출항하는 선셋 크루즈가 커플에게 압도적으로 인기 높으며, 양쪽 대륙의 야경을 배 위에서 동시에 감상할 수 있다.",
        details: { hours: "페리: 하루 3~4회 / 선셋 크루즈: 17:30~20:00", price: "공공 페리 ₺40~60 / 선셋 크루즈 ₺500~1,000", tip: "에미르뇌뉘(Eminönü) 선착장 출발. 크루즈 업체는 GetYourGuide·Viator로 사전 예약하면 더 저렴" },
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
    mapUrl: "https://www.google.com/maps/dir/Hotel+Arcadia+Blue+Istanbul/Istanbul+Airport+IST+Turkey",
    mapStops: ["🏨 이스탄불 호텔", "IST 공항", "✈️ 비행", "카이세리 공항", "괴레메 마을", "로즈 밸리", "🏨 동굴 호텔"],
    mapSegments: [
      { icon: "🚕", mode: "택시", time: "약 40분", dist: "40km", tip: "술탄아흐메트 → IST 공항(하발리스트). 아침 일찍이라 비교적 막힘 없음. BiTaksi 앱 호출 추천, 약 ₺400~500. 공항 2시간 전 도착 권장" },
      { icon: "✈️", mode: "국내선 (IST → ASR)", time: "1시간 20분", dist: "750km", tip: "이스탄불(IST) → 카이세리(ASR) 직항. TK 또는 PC 탑승. 수하물은 위탁 후 카파도키아 호텔까지 바로" },
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
        photos: [
          "https://source.unsplash.com/800x500/?goreme,cappadocia,village",
          "https://source.unsplash.com/800x500/?cappadocia,cave,cafe",
          "https://source.unsplash.com/800x500/?cappadocia,balloon,morning",
        ],
        desc: "카파도키아 여행의 베이스캠프. 화산 응회암을 직접 깎아 만든 동굴 카페, 동굴 호텔, 동굴 레스토랑이 마을 전체를 이루고 있으며, 마을 자체가 유네스코 세계유산 구역 안에 포함된다. 마을 중심에서 모든 주요 관광지가 도보 또는 짧은 차량 이동으로 닿는 것이 장점. 열기구 운항 중심지이기도 해서 이른 새벽부터 하늘 위로 수십 개의 열기구가 떠오르는 장관을 숙소 테라스에서 바로 감상할 수 있다.",
        details: { hours: "마을 상시 개방 / 야외박물관 08:00~19:00", price: "마을 입장 무료", tip: "마을 중심 언덕 위에서 해 질 녘 사진이 가장 잘 나옴. 현지 동굴 카페에서 터키차(çay) 한 잔 꼭 마셔볼 것" },
      },
      {
        emoji: "🌄",
        name: "로즈 밸리 (장미 계곡)",
        photos: [
          "https://source.unsplash.com/800x500/?rose,valley,cappadocia,sunset",
          "https://source.unsplash.com/800x500/?red,valley,cappadocia,hiking",
          "https://source.unsplash.com/800x500/?cappadocia,canyon,pink,rock",
        ],
        desc: "화산 응회암이 수백만 년에 걸쳐 침식되며 형성된 붉은 빛깔의 계곡. 석양이 질 무렵 암벽이 분홍·장밋빛·주황색으로 물드는 광경이 압권으로, 카파도키아에서 가장 아름다운 일몰 포인트로 꼽힌다. 잘 정비된 트레킹 코스(왕복 약 4km, 2시간)가 있으며, 중간중간 초기 기독교 수도사들이 파놓은 소규모 동굴 교회도 만날 수 있다. 일몰 30분 전 현장 도착이 황금 포인트.",
        details: { hours: "일출~일몰", price: "무료", tip: "편한 운동화 필수. 내려갈 때는 쉽지만 올라올 때 급경사 구간 있음. 물과 간식 챙기기. 헤드랜턴 있으면 일몰 후 귀환 시 유용" },
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
    mapUrl: "https://www.google.com/maps/dir/Kelebek+Special+Cave+Hotel+Goreme/Goreme+Open+Air+Museum+Turkey/Devrent+Valley+Cappadocia/Pasabag+Fairy+Chimneys+Cappadocia/Avanos+Nevsehir+Turkey/Kelebek+Special+Cave+Hotel+Goreme",
    mapStops: ["🏨 동굴 호텔", "야외박물관", "데브렌트 밸리", "파샤바", "아바노스", "🏨 동굴 호텔"],
    mapSegments: [
      { icon: "🚶", mode: "도보", time: "10분", dist: "800m", tip: "Kelebek Cave Hotel에서 야외박물관까지 괴레메 마을 북동쪽 오르막길. 표지판 따라 걸어서 이동. 입장료 약 ₺750 별도" },
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
        photos: [
          "https://source.unsplash.com/800x500/?cappadocia,hot,air,balloon,sunrise",
          "https://source.unsplash.com/800x500/?cappadocia,balloon,fairy,chimneys",
          "https://source.unsplash.com/800x500/?cappadocia,balloon,sky,view",
        ],
        desc: "카파도키아 최고의 액티비티이자 버킷리스트 1순위. 새벽 4시 30분 기상, 출발지 이동 후 35~45분 준비, 일출과 함께 약 1시간 비행한다. 200~300m 상공에서 버섯바위·동굴 지형·열기구 군락이 한데 어우러진 장관이 펼쳐진다. 착륙 후 전통적으로 샴페인을 터뜨리고 인증서를 수여하는 세리머니가 있다. 5월 성수기엔 최소 2~3주 전 예약 필수. 기상 악화 시 취소되며 당일 재조정된다.",
        details: { hours: "새벽 04:30~07:30 (일출 전후)", price: "1인 약 €150~200 (₩22~30만원)", tip: "Kapadokya Balloons·Royal Balloon 같은 대형 안전 인증 업체 추천. 방풍 자켓 필수. 일몰 전날 취소 통보가 오면 익일 자동 재배정" },
      },
      {
        emoji: "⛪",
        name: "괴레메 야외박물관",
        photos: [
          "https://source.unsplash.com/800x500/?goreme,open,air,museum",
          "https://source.unsplash.com/800x500/?cave,church,fresco,cappadocia",
          "https://source.unsplash.com/800x500/?cappadocia,rock,monastery",
        ],
        desc: "유네스코 세계유산으로, 10~13세기 초기 기독교 수도사들이 화산 응회암 절벽을 직접 파서 만든 동굴 수도원·교회·식당 군락. 30개 이상의 암굴 교회가 밀집해 있으며, 내부에는 중세 비잔틴 채색 프레스코화가 놀라운 보존 상태로 남아 있다. 특히 '토칼리 교회(Tokalı Kilise)'는 규모와 채색화 수준이 압도적이다. 별도 표를 끊는 '어두운 교회(Karanlık Kilise)'의 내부가 가장 화려하다.",
        details: { hours: "08:00~19:00", price: "약 ₺750 / 어두운 교회 추가 ₺200", tip: "가장 붐비는 명소. 09시 이전 입장 시 여유롭게 관람 가능. 사진은 외부에서만 촬영 허용 (내부 금지)" },
      },
      {
        emoji: "🏔️",
        name: "데브렌트 밸리 (상상의 계곡)",
        photos: [
          "https://source.unsplash.com/800x500/?devrent,valley,cappadocia",
          "https://source.unsplash.com/800x500/?cappadocia,rock,formation,camel",
          "https://source.unsplash.com/800x500/?cappadocia,volcanic,rock,landscape",
        ],
        desc: "'상상의 계곡'이라는 별명을 가진 곳. 바람과 비에 수백만 년간 깎인 기암들이 낙타·독수리·나폴레옹·바다표범 등 동물이나 사람의 형태를 닮아 있다. 방문객들이 서로 다른 형상을 찾아내는 재미가 있으며, 낙타 바위가 가장 유명하다. 레드 투어 차량에서 잠시 내려 30~40분 산책하는 코스로 포함된다.",
        details: { hours: "상시 개방", price: "무료", tip: "레드 투어에 포함된 코스. 자유여행이라면 렌터카로 이동. 모자와 선크림 필수 (그늘 거의 없음)" },
      },
      {
        emoji: "🍄",
        name: "파샤바 버섯바위 (요정 굴뚝)",
        photos: [
          "https://source.unsplash.com/800x500/?fairy,chimneys,cappadocia",
          "https://source.unsplash.com/800x500/?pasabag,monks,valley,turkey",
          "https://source.unsplash.com/800x500/?cappadocia,mushroom,rock,cone",
        ],
        desc: "카파도키아를 상징하는 가장 아이코닉한 풍경. 단단한 현무암 모자를 얹은 채 솟아 있는 원뿔형 응회암 기둥들로, '페리 침니(Fairy Chimney, 요정 굴뚝)'라 불린다. 파샤바(수도승 계곡)는 세 개의 머리가 달린 형태 등 특이한 버섯바위가 집중된 구역이다. 과거 수도사들이 이 안을 파고 들어가 생활했으며, 일부 내부를 직접 들어가 볼 수 있다. 열기구에서 내려다보이는 그 장면을 지상에서 마주하는 감동이 있다.",
        details: { hours: "08:00~19:00", price: "약 ₺200", tip: "이른 오전(09시 이전) 방문 시 황금빛 조명과 조용한 환경 확보. 사진은 기둥과 가까이 가서 찍어야 원근감이 극대화됨" },
      },
      {
        emoji: "🏺",
        name: "아바노스 도자기 마을",
        photos: [
          "https://source.unsplash.com/800x500/?avanos,pottery,workshop,turkey",
          "https://source.unsplash.com/800x500/?turkish,ceramic,art,pottery",
          "https://source.unsplash.com/800x500/?clay,pottery,wheel,craft",
        ],
        desc: "히타이트 시대부터 5,000년 이상 이어온 도자기 역사를 가진 마을. 인근 클즐 으르막(붉은 강)의 붉은 점토가 원료로, 마을 전체가 도자기 공방 거리로 이루어져 있다. 전통 물레 위에서 직접 도자기를 빚어보는 체험이 가능하며, 공방마다 고유한 패턴과 디자인이 있어 구경하는 재미도 있다. 직접 만든 작품을 소성(굽기)해 배송해주는 서비스를 제공하는 공방도 있다.",
        details: { hours: "09:00~18:00", price: "체험 약 ₺300~500 / 구경 무료", tip: "체험 후 구입 압박이 있을 수 있으니 예산 미리 정하기. 도자기는 깨지기 쉬우니 기포 완충재 포장 요청 필수" },
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
    mapUrl: "https://www.google.com/maps/dir/Kelebek+Special+Cave+Hotel+Goreme/Derinkuyu+Underground+City+Turkey/Ihlara+Valley+Turkey/Goreme+Nevsehir+Turkey/Kelebek+Special+Cave+Hotel+Goreme",
    mapStops: ["🏨 동굴 호텔", "데린쿠유 지하도시", "으흘라라 계곡", "괴레메", "🏨 동굴 호텔"],
    mapSegments: [
      { icon: "🚌", mode: "그린 투어 버스 (호텔 픽업)", time: "35분", dist: "30km", tip: "그린 투어 차량이 Kelebek Cave Hotel 앞에서 직접 픽업. 투어 예약 시 호텔 주소 전달 필수. 픽업 시간 전날 확인" },
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
        photos: [
          "https://source.unsplash.com/800x500/?derinkuyu,underground,city,cappadocia",
          "https://source.unsplash.com/800x500/?underground,tunnel,ancient,cave",
          "https://source.unsplash.com/800x500/?cappadocia,underground,carved,rock",
        ],
        desc: "지하 85m 깊이, 18개 층으로 이루어진 인류 최대 규모의 지하 도시. 기원전 8세기경부터 조성된 것으로 추정되며, 초기 기독교인들이 로마 제국의 박해를 피해 최대 2만 명이 생활했던 것으로 알려진다. 자체 환기구·우물·교회·학교·마굿간·포도주 저장고까지 갖춘 완전한 지하 도시 시스템이다. 현재는 지하 5~8층까지 공개되어 있으며, 좁은 통로와 낮은 천장이 특징적이다.",
        details: { hours: "08:00~19:00", price: "약 ₺700", tip: "폐소 공포증 있으면 주의. 통로가 매우 좁고 천장이 낮음. 무릎을 굽히며 이동하는 구간 많음. 서늘해서 얇은 겉옷 하나 챙기기" },
      },
      {
        emoji: "🏞️",
        name: "으흘라라 계곡",
        photos: [
          "https://source.unsplash.com/800x500/?ihlara,valley,canyon,river,turkey",
          "https://source.unsplash.com/800x500/?ihlara,green,canyon,cappadocia",
          "https://source.unsplash.com/800x500/?river,hiking,canyon,turkey",
        ],
        desc: "화산 폭발로 형성된 14km 길이의 협곡. 양쪽 60~80m 높이 절벽에 초기 기독교인들이 파놓은 수십 개의 동굴 교회가 새겨져 있으며, 계곡 바닥을 흐르는 멜렌디즈 강이 초록빛 식생과 어우러져 카파도키아의 황량한 풍경과 강렬한 대조를 이룬다. 3.5km 하이킹 코스(약 1시간 30분)를 따라 비잔틴 프레스코화가 남아 있는 동굴 교회들을 만날 수 있다. 중간에 강 위 나무다리를 건너는 구간이 포토 스팟으로 인기 높다.",
        details: { hours: "08:00~19:00", price: "약 ₺200 (계곡 입장료)", tip: "방수 기능 운동화 필수 (강변 구간 미끄러울 수 있음). 물 충분히 챙기기. 출구까지 편도 코스라 돌아올 때 택시 필요 (약 ₺100)" },
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
    mapUrl: "https://www.google.com/maps/dir/Kelebek+Special+Cave+Hotel+Goreme/Kayseri+Airport+ASR+Turkey",
    mapStops: ["🏨 동굴 호텔", "카이세리 공항", "✈️ 비행", "안탈리아 공항", "칼레이치", "하드리아누스 문", "구항구", "🏨 호텔"],
    mapSegments: [
      { icon: "🚌", mode: "호텔 셔틀 또는 택시", time: "약 75분", dist: "75km", tip: "Kelebek Cave Hotel → 카이세리 공항. 호텔 전날 셔틀 예약 권장 (약 ₺400). 또는 택시 ₺700~800. 비행 2시간 전 출발" },
      { icon: "✈️", mode: "국내선 (ASR → AYT)", time: "1시간 20분", dist: "약 500km", tip: "카이세리(ASR) → 안탈리아(AYT) 직항. 페가수스(PC) 또는 썬익스프레스(XQ) 탑승. 직항 없을 시 이스탄불 경유" },
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
        photos: [
          "https://source.unsplash.com/800x500/?kaleici,antalya,old,town,alley",
          "https://source.unsplash.com/800x500/?antalya,boutique,hotel,alley",
          "https://source.unsplash.com/800x500/?antalya,historic,street,ottoman",
        ],
        desc: "'내부 성곽'이라는 뜻의 칼레이치는 로마·비잔틴·셀주크·오스만 시대의 건물이 한데 공존하는 미로 같은 골목길이다. 2,000년 이상의 역사를 품은 성벽 안쪽에 오스만 시대 석조 저택들이 부티크 호텔·레스토랑·카페로 재탄생해 있다. 좁은 골목을 따라 걷다 보면 로마 시대 성벽, 케시크 미나레트(잘린 첨탑), 히드리리크 탑이 차례로 나타난다. 저녁 조명이 켜진 후 산책이 가장 아름답다.",
        details: { hours: "24시간 (상점 10:00~22:00)", price: "무료", tip: "구글 맵 없으면 미로 골목에서 길 잃기 쉬움. 저녁 10시 이후 골목 조명 연출이 가장 예쁜 시간대" },
      },
      {
        emoji: "🏛️",
        name: "하드리아누스 문",
        photos: [
          "https://source.unsplash.com/800x500/?hadrian,gate,antalya,roman,arch",
          "https://source.unsplash.com/800x500/?ancient,gate,roman,turkey,arch",
          "https://source.unsplash.com/800x500/?antalya,roman,monument,night",
        ],
        desc: "서기 130년 로마 황제 하드리아누스의 안탈리아 방문을 기념해 건설된 3개 아치의 대리석 개선문. 거의 2,000년이 지난 지금도 원형에 가깝게 보존되어 있다. 하얀 대리석 기둥과 섬세한 조각이 특징이며, 현재도 칼레이치 구시가지로 들어가는 관문 역할을 한다. 밤에 조명을 받으면 더욱 극적인 분위기를 연출해 야경 사진 명소로도 유명하다.",
        details: { hours: "24시간 (외관)", price: "무료", tip: "밤 조명이 켜지는 19~20시 이후가 사진 찍기 가장 좋음. 문 아래에서 위를 올려다보는 앵글이 클래식 구도" },
      },
      {
        emoji: "⚓",
        name: "구항구",
        photos: [
          "https://source.unsplash.com/800x500/?antalya,old,harbor,marina,yacht",
          "https://source.unsplash.com/800x500/?antalya,harbor,sunset,mediterranean",
          "https://source.unsplash.com/800x500/?antalya,roman,harbor,cliff",
        ],
        desc: "기원전 2세기 아탈로스 2세가 건설한 천연 항구로 2,000년 이상의 역사를 지닌다. 반원형 성벽에 둘러싸인 아담한 항구에 흰색 요트들이 가득 정박해 있고, 카페와 레스토랑이 항구를 에워싸고 있어 지중해 분위기가 물씬 풍긴다. 특히 저녁 석양 무렵 성벽 위에서 내려다보는 경치가 압권이며, 항구 바로 위 성벽 위에 레스토랑 Club Arma가 있어 뷰 맛집으로 유명하다.",
        details: { hours: "24시간", price: "무료", tip: "석양 30분 전 성벽 위쪽에 자리 잡으면 최고의 포인트. 항구 주변 카페에서 터키 커피 한 잔 마시며 감상하기 강추" },
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
        photos: [
          "https://source.unsplash.com/800x500/?suluada,turquoise,sea,island,turkey",
          "https://source.unsplash.com/800x500/?clear,water,swimming,mediterranean,island",
          "https://source.unsplash.com/800x500/?boat,trip,turquoise,aegean,sea",
        ],
        desc: "'튀르키예의 몰디브'라 불리는 작은 무인도. 파도가 잔잔하고 수심이 얕아 스노클링 명소로 알려진 에메랄드빛 바다가 펼쳐진다. 새하얀 자갈 해변과 수면 아래 산호·물고기도 선명하게 보인다. 아드라산 항구에서 보트로 약 1시간 거리라 접근이 쉽지 않아 상대적으로 사람이 적고 원시적인 자연 그대로의 풍경이 유지된다. 보트투어에 선상 점심이 포함되는 경우가 많다.",
        details: { hours: "보트투어 기준 07:00~17:00", price: "1인 €30~50 (보트투어 포함)", tip: "멀미약 미리 복용 권장. 수건·수영복·선크림·아쿠아 슈즈 필수. 스노클링 장비는 투어에 보통 포함" },
      },
      {
        emoji: "💧",
        name: "두덴 폭포",
        photos: [
          "https://source.unsplash.com/800x500/?duden,waterfall,antalya,cliff",
          "https://source.unsplash.com/800x500/?waterfall,cliff,sea,mediterranean,rainbow",
          "https://source.unsplash.com/800x500/?antalya,coastal,waterfall,park",
        ],
        desc: "안탈리아 북쪽 12km 지점에서 30m 절벽을 타고 지중해로 직접 떨어지는 이색 폭포. 배를 타고 절벽 아래에서 올려다보거나, 절벽 위 공원에서 내려다보는 두 가지 감상법이 있다. 바위 절벽 뒤로 물보라와 무지개가 피어나 사진이 아름답게 찍힌다. 주변 공원이 잘 정비되어 있어 산책하기도 좋으며, 절벽 위 카페에서 음료를 마시며 조망하는 것도 인기 코스다.",
        details: { hours: "08:00~19:00", price: "공원 입장 무료 / 하단 보트 ₺100~200", tip: "절벽 위 공원은 도보 무료 진입. 무지개 사진은 오전 10~12시 햇빛 각도가 가장 좋음" },
      },
      {
        emoji: "🌊",
        name: "쾨프륄뤼 캐니언 래프팅",
        photos: [
          "https://source.unsplash.com/800x500/?koprulu,canyon,rafting,river,turkey",
          "https://source.unsplash.com/800x500/?whitewater,rafting,canyon,adventure",
          "https://source.unsplash.com/800x500/?river,canyon,gorge,green,turkey",
        ],
        desc: "안탈리아 내륙 쾨프륄뤼 국립공원 내 협곡에서 즐기는 래프팅. 18km 급류 코스에 난이도 1~3급 급류가 섞여 있어 초보자도 즐길 수 있다. 협곡 양쪽 절벽에는 기원전 2세기에 건설된 로마 시대 돌다리(셀게 다리)도 볼 수 있다. 래프팅 후 강변에서 점심 바비큐가 포함된 패키지가 일반적이며, 안탈리아에서 액티비티 하나만 추가한다면 이것을 강력 추천한다.",
        details: { hours: "투어 기준 09:00~17:00", price: "1인 ₺800~1,200 (점심 포함)", tip: "안탈리아에서 약 1시간 거리. 래프팅 복장(방수 재킷) 현장 제공. 편한 방수 샌들 또는 물에 젖어도 되는 운동화 착용" },
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
    mapUrl: "https://www.google.com/maps/dir/Puding+Marina+Residence+Antalya/Konyaalti+Beach+Antalya+Turkey/Antalya+Museum+Turkey/Kaleici+Antalya+Turkey/Puding+Marina+Residence+Antalya",
    mapStops: ["🏨 호텔 출발", "콘야알티 해변", "안탈리아 박물관", "칼레이치", "🏨 호텔"],
    mapSegments: [
      { icon: "🚃", mode: "트램", time: "20분", dist: "5km", tip: "Puding Marina Residence → 트램 Atatürk Kültür 역 탑승 → Müze 역 하차. 콘야알티 해변까지 도보 5분. 트램 약 ₺15" },
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
        photos: [
          "https://source.unsplash.com/800x500/?konyaalti,beach,antalya,mediterranean",
          "https://source.unsplash.com/800x500/?antalya,beach,mountain,taurus",
          "https://source.unsplash.com/800x500/?mediterranean,sea,clear,water,pebble,beach",
        ],
        desc: "안탈리아 최대 해변으로 7km에 달하는 자갈 해변. 뒤로는 토로스(타우루스) 산맥이 병풍처럼 펼쳐지는 절경이며, 물이 맑고 투명해 수영하기 최적의 환경이다. 비치 클럽·선베드·파라솔 대여가 잘 갖춰져 있으며, 해변 서쪽에 아타튀르크 문화 공원이 인접해 있어 산책도 가능하다. 안탈리아 박물관이 해변 동쪽 끝에 붙어 있어 동선이 편리하다. 5월은 성수기 이전이라 한산하고 물도 수영하기 딱 좋은 수온이다.",
        details: { hours: "상시 개방 (선베드 대여 09:00~19:00)", price: "해변 무료 / 선베드 대여 ₺100~300", tip: "자갈 해변이라 발이 아플 수 있음 — 아쿠아 슈즈 강력 추천. 선크림 필수. 샤워 시설 무료 이용 가능" },
      },
      {
        emoji: "🏺",
        name: "안탈리아 박물관",
        photos: [
          "https://source.unsplash.com/800x500/?antalya,museum,ancient,artifacts",
          "https://source.unsplash.com/800x500/?roman,statue,museum,ancient,turkey",
          "https://source.unsplash.com/800x500/?archaeology,museum,sarcophagus,ancient",
        ],
        desc: "터키 최고 수준의 고고학 박물관 중 하나로, 남아나톨리아에서 출토된 방대한 유물을 소장하고 있다. 히타이트·리키아·프리지아·헬레니즘·로마 시대의 유물과 조각상이 시대별로 전시되며, 특히 로마 시대 황제 조각상 군(群)과 석관(석판관)이 인상적이다. 모자이크 전시관과 에트노그라피(민족지학) 전시관도 함께 운영 중이다. 콘야알티 해변 바로 옆이라 해변 후 1~2시간 관람 코스로 딱 맞다.",
        details: { hours: "08:00~19:00 (월요일 휴관)", price: "약 ₺600", tip: "콘야알티 해변에서 도보 5분 이내. 규모가 크니 2~3시간 여유 잡기. 오디오 가이드(영어) 대여 가능" },
      },
      {
        emoji: "🧖",
        name: "하맘 (터키식 목욕)",
        photos: [
          "https://source.unsplash.com/800x500/?turkish,hammam,bath,marble",
          "https://source.unsplash.com/800x500/?hammam,steam,traditional,spa,ritual",
          "https://source.unsplash.com/800x500/?turkish,bath,traditional,interior",
        ],
        desc: "수백 년 이어온 터키 전통 목욕 문화. 뜨거운 대리석 욕상(고벡타쉬)에 누워 몸을 데운 후, 케세(이탈리아 때수건으로 피부 마사지)와 쾨퓌크(거품 마사지)를 차례로 받는다. 사우나·찜질방과 비슷하지만 훨씬 의례적이고 느긋한 분위기가 특징. 마사지 후 피부가 매끄러워지는 효과가 확실하다. 안탈리아 칼레이치 구시가지에 하맘이 여러 곳 있으며, 60~90분 코스가 일반적이다.",
        details: { hours: "09:00~22:00 (하맘마다 상이)", price: "기본 코스 ₺500~1,000 (케세+거품 마사지 포함)", tip: "커플 함께 이용 가능한 혼합 공간 있는 곳은 사전 확인 필요. 속옷 대신 제공되는 페스타말(천) 착용. 너무 배부를 때 피하기" },
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
    mapUrl: "https://www.google.com/maps/dir/Puding+Marina+Residence+Antalya/Antalya+Airport+AYT+Turkey",
    mapStops: ["🏨 안탈리아 호텔", "안탈리아 공항", "이스탄불 공항", "인천 도착"],
    mapSegments: [
      { icon: "🚕", mode: "택시 또는 셔틀버스", time: "25분", dist: "13km", tip: "Puding Marina Residence → AYT 공항. 아침 이른 출발이므로 전날 택시 미리 예약 추천. 미터기 기준 ₺200~300. 하바쉬 셔틀 ₺60" },
      { icon: "✈️", mode: "국내선 (AYT → IST)", time: "1시간 15분", dist: "440km", tip: "페가수스(PC) 또는 터키항공(TK) 탑승. 아시아나(OZ)와 공동 수하물 연결 원하면 TK 필수. 공항 2시간 전 도착 권장" },
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
        photos: [
          "https://source.unsplash.com/800x500/?istanbul,airport,terminal,modern",
          "https://source.unsplash.com/800x500/?duty,free,shopping,airport",
          "https://source.unsplash.com/800x500/?turkish,baklava,sweets,box",
        ],
        desc: "세계 최대 규모의 공항 면세구역 중 하나. 터키산 로쿰(젤리)·바클라바·올리브 오일·사프란·카르피나(향신료)·도자기·스카프(파슈미나)·가죽 제품 등 기념품부터 샤넬·구찌·루이비통 등 명품까지 폭넓게 구비되어 있다. 환승 구간에 있어 국제선 탑승 전 2~3시간 여유가 있다면 충분히 쇼핑 가능.",
        details: { hours: "24시간", price: "면세 혜택 적용", tip: "터키 로쿰은 Hafız Mustafa 공항 매장이 품질·가격 대비 가장 좋음. 올리브 오일 100ml 이하는 기내 반입 가능" },
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
      { name: "Hotel Arcadia Blue Istanbul", type: "부티크 호텔", price: "₩80,000~110,000", point: "아야 소피아·블루 모스크 도보 5분. 루프탑에서 두 건물 동시 조망 가능.", tag: "뷰 맛집", desc: "술탄아흐메트 광장 뒤편에 자리한 4성급 부티크 호텔. 루프탑 테라스에서 아야 소피아와 블루 모스크를 동시에 내려다보는 뷰가 이스탄불 숙소 중 손꼽히는 명당이다. 총 54개 객실 중 슈피리어 더블룸이 커플에게 인기. 술탄아흐메트·갈라타·이스티클랄 거리 모두 도보권이어서 관광 동선이 최적이다." },
      { name: "Sura Hagia Sophia Hotel", type: "부티크 호텔", price: "₩90,000~120,000", point: "술탄아흐메트 중심가. 커플 조용한 분위기. 아야 소피아까지 도보 2분.", tag: "중심가 위치", desc: "아야 소피아까지 도보 2분 거리의 조용한 부티크 호텔. 객실 규모는 아담하지만 아늑하고 방음이 잘 되어 있다. 일부 객실에서 아야 소피아 첨탑 뷰가 보이며, 커플 여행자 리뷰 평점이 꾸준히 높다. 트램 Sultanahmet역이 도보 1분 이내라 교통도 편리하다." },
      { name: "Agora Life Hotel", type: "게스트하우스", price: "₩60,000~80,000", point: "그랜드 바자르 도보 10분. 가성비 최고. 더블룸 깔끔.", tag: "가성비", desc: "여행자 동네 랄렐리(Laleli) 지구의 소규모 게스트하우스. 직원들이 친절하고 이스탄불 여행 정보에 밝아 현지 맛집·이동법 꿀팁을 얻기 좋다. 그랜드 바자르·이집션 바자르·에미르뇌뉘까지 도보 10~15분 이내라 시장 구경 중심의 여행자에게 실용적인 선택지다." },
    ],
  },
  {
    city: "카파도키아",
    color: "#D4883E",
    icon: "🎈",
    nights: "3박 (5/24~5/27)",
    area: "괴레메 마을 동굴 호텔 추천",
    picks: [
      { name: "Kelebek Special Cave Hotel", type: "동굴 호텔 ★", price: "₩90,000~130,000", point: "30년 역사 유명 동굴 호텔. 화산암 객실 + 테라스에서 열기구 뷰. 커플에게 최고 인기.", tag: "커플 픽", desc: "30년 이상의 역사를 가진 카파도키아 대표 동굴 호텔. 괴레메 마을 암반 위 테라스에서 매일 새벽 열기구 군락이 하늘을 수놓는 장관을 감상할 수 있다. 동굴 객실은 화산암 특유의 단열 효과로 여름에도 선선하다. 총 34개 객실이 각각 다른 설계로 개성 있게 꾸며져 있으며, 허니문 케이브 스위트가 커플 1순위 인기 객실이다." },
      { name: "Cappadocia Cave Suites", type: "동굴 호텔", price: "₩100,000~140,000", point: "괴레메 뷰 테라스 보유. 야외 수영장 있음. 열기구 뷰가 SNS 핫플로 유명.", tag: "SNS 핫플", desc: "괴레메 전망이 한눈에 내려다보이는 언덕 위 동굴 호텔. 인스타그램에서 가장 많이 공유되는 카파도키아 숙소 뷰 포인트로 유명하다. 야외 수영장에서 바라보는 계곡 전망이 압권이며, 아치형 천장과 직접 깎은 석조 욕실이 있는 동굴 스위트가 특히 인기. 성수기엔 3~4주 전 예약 필수다." },
      { name: "Travellers Cave Hotel", type: "동굴 게스트하우스", price: "₩55,000~75,000", point: "가성비 동굴 숙소. 괴레메 중심가 위치. 커플 더블룸 아늑한 동굴 분위기.", tag: "가성비", desc: "괴레메 마을 중심가의 가성비 동굴 숙소. 가격 대비 청결도와 시설이 좋고 테라스에서 마을 전경이 보인다. 운영진이 영어와 약간의 한국어를 구사해 의사소통이 편리하며, 열기구·투어 예약을 호텔을 통해 연계해준다. 아치형 천장의 동굴 더블룸이 아늑한 분위기를 낸다." },
    ],
  },
  {
    city: "안탈리아",
    color: "#2E7D6F",
    icon: "🏖️",
    nights: "3박 (5/27~5/30)",
    area: "칼레이치 구시가지 or 해변가 추천",
    picks: [
      { name: "Puding Marina Residence", type: "부티크 호텔", price: "₩80,000~110,000", point: "구항구 바로 앞. 지중해 뷰 테라스. 로맨틱한 분위기로 커플 강추.", tag: "커플 픽", desc: "구항구 성벽 바로 위에 위치한 4성급 부티크 호텔. 구항구와 지중해가 한눈에 내려다보이는 테라스가 최고의 강점이다. 오래된 석조 저택을 개조한 건물로 복층 스위트가 가장 인기 있으며, 일부 객실은 바다 직접 조망이 가능하다. 칼레이치 구시가지 내라 차량 접근이 제한적이므로 도착 시 짐은 도보로 이동해야 한다." },
      { name: "Alp Pasa Boutique Hotel", type: "부티크 호텔", price: "₩85,000~115,000", point: "칼레이치 중심 오스만 시대 저택 개조. 중정 정원이 아름다운 숨은 명소.", tag: "분위기 맛집", desc: "칼레이치 한복판의 18세기 오스만 저택을 개조한 부티크 호텔. 객실마다 다른 클래식 인테리어가 적용되어 있으며, 중정(안뜰) 정원의 오렌지 나무와 분수가 분위기를 완성한다. 총 26개 객실 중 가든 스위트가 커플에게 최고 추천. 조용하고 프라이빗한 분위기를 원하는 커플에게 제격인 숨은 명소다." },
      { name: "Ani Boutique Hotel", type: "게스트하우스", price: "₩50,000~70,000", point: "칼레이치 골목 안 아담한 숙소. 가성비 최고. 주인이 친절해 여행 팁 풍부.", tag: "가성비", desc: "칼레이치 골목 안쪽의 아담한 가족 운영 게스트하우스. 주인 부부가 매우 친절하고 안탈리아 구석구석 맛집·명소 정보를 꿰고 있어 현지 정보를 얻기 좋다. 옥상 테라스에서 구시가지 전경이 보이며, 객실은 작지만 깔끔하게 유지되어 있다. 가성비 숙소 중 인테리어가 가장 예쁘다는 리뷰가 많다." },
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
  const current = days[activeDay];

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
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {current.attractions.map((a, i) => (
                  <div key={i} style={{
                    background: "#FFFFFF", borderRadius: "16px", overflow: "hidden",
                    border: `1px solid ${current.color}18`, boxShadow: "0 2px 14px rgba(196,87,58,0.08)",
                  }}>
                    {/* 사진 스트립 */}
                    <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                      {a.photos.map((photo, pi) => (
                        <img
                          key={pi}
                          src={photo}
                          alt={`${a.name} ${pi + 1}`}
                          onError={e => { e.target.style.display = "none"; }}
                          style={{
                            flexShrink: 0,
                            width: pi === 0 ? "100%" : "72%",
                            height: "180px",
                            objectFit: "cover",
                            display: "block",
                            borderRight: pi < a.photos.length - 1 ? "3px solid #fff" : "none",
                          }}
                        />
                      ))}
                    </div>
                    {/* 본문 */}
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <span style={{ fontSize: "20px" }}>{a.emoji}</span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: current.color }}>{a.name}</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "#4A2E22", lineHeight: 1.9, margin: "0 0 12px" }}>{a.desc}</p>
                      {/* 상세 정보 */}
                      {a.details && (
                        <div style={{
                          display: "flex", flexDirection: "column", gap: "7px",
                          padding: "11px 13px", background: current.color + "08",
                          borderRadius: "10px", border: `1px solid ${current.color}15`,
                        }}>
                          {a.details.hours && (
                            <div style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#5A3A28", alignItems: "flex-start" }}>
                              <span style={{ fontWeight: 700, color: current.color, flexShrink: 0 }}>🕐 운영</span>
                              <span style={{ lineHeight: 1.5 }}>{a.details.hours}</span>
                            </div>
                          )}
                          {a.details.price && (
                            <div style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#5A3A28", alignItems: "flex-start" }}>
                              <span style={{ fontWeight: 700, color: current.color, flexShrink: 0 }}>💰 요금</span>
                              <span style={{ lineHeight: 1.5 }}>{a.details.price}</span>
                            </div>
                          )}
                          {a.details.tip && (
                            <div style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#5A3A28", alignItems: "flex-start" }}>
                              <span style={{ fontWeight: 700, color: current.color, flexShrink: 0 }}>💡 팁</span>
                              <span style={{ lineHeight: 1.5 }}>{a.details.tip}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
                    <div style={{ fontSize: "12px", fontWeight: 700, color: h.color, marginBottom: "6px" }}>{p.price} / 1박</div>
                    <div style={{ fontSize: "11px", color: "#6A4A38", lineHeight: 1.6, marginBottom: p.desc ? "8px" : 0 }}>{p.point}</div>
                    {p.desc && (
                      <div style={{ fontSize: "11px", color: "#7A5A4A", lineHeight: 1.7, paddingTop: "8px", borderTop: `1px solid ${h.color}15` }}>{p.desc}</div>
                    )}
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
