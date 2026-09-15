import { useState, type CSSProperties } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Icon, { type IconName } from '../components/Icon'
import dashboardStyles from './Dashboard.scss?inline'
import './ExerciseInfo.scss'

const items: { name: string; icon: IconName; color: string; description: string; tips: string[] }[] = [
  { name: '러닝', icon: 'run', color: '#675cf3', description: '심폐 지구력과 체력을 키우는 대표적인 유산소 운동입니다.', tips: ['운동 전 5분 이상 가볍게 걷기', '자신의 페이스를 유지하며 호흡하기', '운동 후 충분히 스트레칭하기'] },
  { name: '걷기', icon: 'walk', color: '#31b779', description: '부담 없이 시작할 수 있는 전신 유산소 운동입니다.', tips: ['시선을 정면으로 유지하기', '팔을 자연스럽게 흔들기', '편한 운동화를 착용하기'] },
  { name: '자전거', icon: 'bike', color: '#e4a72d', description: '하체 근력과 심폐 기능 향상에 도움을 줍니다.', tips: ['안전모와 보호 장비 착용하기', '출발 전 자전거 상태 확인하기', '안전한 코스를 선택하기'] },
  { name: '등산', icon: 'mountain', color: '#ef7b45', description: '자연 속에서 하체 근력과 균형 감각을 높입니다.', tips: ['물과 간식을 준비하기', '무리하지 않고 천천히 오르기', '기상 상황을 확인하기'] },
  { name: '수영', icon: 'swim', color: '#3c9ae8', description: '관절 부담이 적고 전신을 사용하는 운동입니다.', tips: ['준비운동으로 몸을 풀기', '수분을 충분히 섭취하기', '안전요원의 안내 따르기'] },
]

export default function ExerciseInfo() {
  const [selected, setSelected] = useState('러닝')
  const item = items.find(value => value.name === selected) ?? items[0]
  return <><style>{dashboardStyles}</style><div className="dashboard exercise-page dashboard-exercise"><Sidebar /><main className="content" id="top">
    <header className="welcome"><div><h1>운동 정보</h1><p><Icon name="activity" size={12} /> 운동별 추천 정보와 주의사항을 확인하세요</p></div><div className="header-actions"><a href="/dashboard">대시보드로 돌아가기</a></div></header>
    <section className="exercise-select panel"><h2>운동 선택</h2><div className="chips">{items.map(value => <button key={value.name} className={value.name === selected ? 'selected' : ''} onClick={() => setSelected(value.name)}><Icon name={value.icon} size={17} />{value.name}</button>)}</div></section>
    <div className="exercise-info-grid"><section className="panel exercise-hero" style={{ '--exercise-color': item.color } as CSSProperties}><div className="exercise-hero-icon"><Icon name={item.icon} size={44} /></div><span className="good">추천 운동</span><h2>{item.name}</h2><p>{item.description}</p><div className="exercise-metrics"><div><b>30분</b><small>추천 시간</small></div><div><b>중간</b><small>운동 강도</small></div><div><b>250 kcal</b><small>예상 소모량</small></div></div></section><section className="panel"><div className="title-row"><h2>운동 가이드</h2><span className="level">안전하게 시작하기</span></div><p className="updated">오늘의 {item.name} 체크리스트</p><div className="exercise-tips">{item.tips.map((tip, index) => <div key={tip}><span>{index + 1}</span><p>{tip}</p></div>)}</div></section></div>
  </main></div></>
}
