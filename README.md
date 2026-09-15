# 강원 2박3일 여행

모바일 여행 일정 웹앱입니다. 기본 일정은 Git 파일로 관리하고, 여행 당일 기록은 휴대폰 브라우저의 localStorage에 저장됩니다.

## 1. 개발 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 을 엽니다.

## 2. 빌드 확인

```bash
npm run build
```

오류가 없으면 배포 가능한 상태입니다.

## 3. Git 저장 방법

일정을 수정한 뒤 아래처럼 저장하고 올립니다.

```bash
git add .
git commit -m "DAY 2 일정 수정"
git push
```

## 4. GitHub와 Vercel

GitHub 저장소가 Vercel과 연결되어 있다면 `git push` 후 자동으로 새 버전이 배포됩니다. 별도로 서버를 다시 올릴 필요는 없습니다.

## 5. 여행 일정 변경 방법

기본 일정은 아래 파일만 수정하면 됩니다.

- `src/data/day1.js`
- `src/data/day2.js`
- `src/data/day3.js`

DAY 3 기본 일정 수정:

```bash
git add .
git commit -m "DAY 3 일정 추가"
git push
```

GitHub와 Vercel이 연결되어 있다면 push 후 자동으로 새 버전이 배포됩니다.

장소 이름, 설명, 추천 순서, 기본 코스를 여기서 고칩니다.

앱의 **추천 일정으로 초기화**는 휴대폰에 저장된 당일 순서만 원래 추천 순서로 되돌립니다. Git 원본 파일은 브라우저에서 수정되지 않습니다.

## Git에 저장되는 것

- 기본 여행 일정
- 추천 순서
- 장소 설명
- 기본 코스
- 디자인과 앱 기능

## 휴대폰 localStorage에 저장되는 것

- 여행 당일 사용자가 바꾼 일정 순서
- 완료 상태
- 실제 도착/출발 시간
- 개인 메모
- 오늘 제외
- 체력 코스 선택
- 체크아웃 체크리스트
