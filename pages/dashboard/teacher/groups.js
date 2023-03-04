import Head from 'next/head'
import TeacherGroup from '../../../src/Components/Pages/Dashboard/Teacher/TeacherGroup'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'

export default function Home() {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <TeacherGroup/>
      </WithAuthComponent>

    </div>
  )
}