import { useState } from 'react'
import { useApp } from '../App.jsx'
import { moduleState } from '../platform/progress.js'
import { Icon } from './icons.jsx'

const KEYS = 'ABCD'

export default function Quiz({ module }) {
  const { progress, saveQuiz, notify } = useApp()
  const { questions, passMark } = module.quiz
  const prev = moduleState(progress, module.id).quiz
  const [phase, setPhase] = useState(prev?.passed ? 'summary' : 'intro')
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState({})
  const q = questions[i]
  const picked = answers[q?.id]
  const need = Math.ceil(passMark * questions.length)

  function start() { setAnswers({}); setI(0); setPhase('run') }
  function pick(k) { if (picked == null) setAnswers({ ...answers, [q.id]: k }) }
  function nextQ() {
    if (i < questions.length - 1) { setI(i + 1); return }
    const correct = questions.filter((qq) => qq.options[answers[qq.id]]?.correct).length
    const score = correct / questions.length
    const passed = score >= passMark
    saveQuiz(module.id, { score, correct, total: questions.length, passed, answers, at: new Date().toISOString() })
    notify(passed ? 'Quiz passed. Well done!' : `Not quite. You need ${need} correct to pass.`)
    setPhase('result')
  }

  if (phase === 'intro' || phase === 'summary') {
    return (
      <div className="activity">
        <div className="activity-head">
          <span className="activity-kind">Graded quiz</span>
          <h3>{questions.length} questions · pass mark {Math.round(passMark * 100)}% ({need} correct)</h3>
          <p className="muted">You'll get feedback after every answer. You can retake the quiz as often as you like; your best score counts.</p>
        </div>
        {prev && <div className={'feedback ' + (prev.passed ? 'good' : 'neutral')}><b>{prev.passed ? 'Passed' : 'Not passed yet'}</b><span className="tnum">Best score {Math.round(prev.best * 100)}% · {prev.attempts} attempt{prev.attempts > 1 ? 's' : ''}</span></div>}
        <div className="row">
          <button className="btn btn-primary" onClick={start}>{prev ? 'Retake quiz' : 'Start quiz'} <Icon.arrowR /></button>
          {prev?.last && <button className="btn" onClick={() => { setAnswers(prev.last.answers); setPhase('result') }}>Review last attempt</button>}
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const correct = questions.filter((qq) => qq.options[answers[qq.id]]?.correct).length
    const passed = correct / questions.length >= passMark
    return (
      <div className="stack" style={{ gap: '1.25rem' }}>
        <div className="card score-hero celebrate">
          <span className="eyebrow">{passed ? 'Passed' : 'Not passed yet'}</span>
          <div className="big tnum" style={{ color: passed ? 'var(--good)' : 'var(--bad)' }}>{correct}/{questions.length}</div>
          <p className="muted" style={{ maxWidth: '50ch' }}>{passed ? 'Great work. Continue to the key takeaways to wrap up the module.' : `You need ${need} correct answers to pass. Review the feedback below, revisit the lessons, and try again.`}</p>
          <div className="row" style={{ justifyContent: 'center' }}><button className="btn" onClick={start}>Retake quiz</button></div>
        </div>
        <div className="card" style={{ padding: '0 1.25rem' }}>
          {questions.map((qq, n) => {
            const a = answers[qq.id]
            const opt = qq.options[a]
            const right = qq.options.find((o) => o.correct)
            return (
              <div className="review-item" key={qq.id}>
                <span className="small muted">Question {n + 1}{qq.added ? <span data-added="true" className="pill" style={{ marginLeft: '.5rem' }}>Added question</span> : null}</span>
                <strong>{qq.q}</strong>
                <span style={{ color: opt?.correct ? 'var(--good)' : 'var(--bad)' }}>{opt?.correct ? '✓' : '✗'} Your answer: {opt ? opt.t : 'No answer'}</span>
                {!opt?.correct && <span className="small">Correct answer: {right.t}</span>}
                <span className="small muted">{(opt?.correct ? opt : right).fb}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const answered = picked != null
  return (
    <div className="activity quiz-q" data-added={q.added ? 'true' : undefined}>
      <div className="quiz-top">
        <span className="activity-kind">Question {i + 1} of {questions.length}</span>
        <div className="bar" style={{ width: 160 }}><span style={{ width: ((i + (answered ? 1 : 0)) / questions.length) * 100 + '%' }} /></div>
      </div>
      <h3 style={{ fontFamily: 'var(--f-body)', fontWeight: 600, lineHeight: 1.4 }}>{q.q}</h3>
      <div className="choice-list" role="radiogroup">
        {q.options.map((o, k) => {
          let cls = 'choice'
          if (answered) cls += o.correct ? ' correct' : k === picked ? ' wrong' : ''
          return (
            <button key={k} className={cls} disabled={answered} onClick={() => pick(k)} role="radio" aria-checked={k === picked}>
              <span className="key">{KEYS[k]}</span>
              <span>{o.t}</span>
              {answered && (k === picked || o.correct) && <span className="fb">{o.fb}</span>}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={'feedback ' + (q.options[picked].correct ? 'good' : 'bad')}>
          <b>{q.options[picked].correct ? 'Correct' : 'Not quite'}</b>
          <span>{q.options[picked].correct ? 'Read the explanation above, then continue.' : 'Your answer and the correct answer are both explained above.'}</span>
        </div>
      )}
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <button className="btn btn-dark" disabled={!answered} onClick={nextQ}>{i === questions.length - 1 ? 'See my score' : 'Next question'} <Icon.arrowR /></button>
      </div>
    </div>
  )
}
