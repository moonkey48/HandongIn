import { useState,useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

export default function Home({fireBaseApp, database, setOffers,handleProfileDB,students,updateOrCreateProfile}) {
  const router = useRouter();
  const [welcomeText, setWelcomeText] = useState('Hello Pro ๐');
  const handleLogin = async() =>{
    await fireBaseApp.login((result)=>{
      if(!result){
        setWelcomeText('๋ก๊ทธ์ธ์ ๋ฌธ์ ๊ฐ ์๊ฒผ์ต๋๋ค. ๋ค์ ์๋ํด์ฃผ์ธ์')
        return;
      }
      if(!students[result.uid]){
        console.log('new user');
        const newStudent = {
          uid:result.uid,
          name: result.name,
          about: '-',
          major: '-',
          email:result.email,
          tags: {},
          experience: '-',
          profileImg: '-',
          homepage: '-',
        }
        updateOrCreateProfile(newStudent.uid, newStudent);
        database.setProfile(result.uid, newStudent);
      }

      console.log(`${result.uid} login success`);
      router.push({
        pathname: '/main',
        query:{
          uid:result.uid,
        }
      })
    })
  }
  useEffect(()=>{
    const stopSyncOfferDB = database.syncOffers((data)=>setOffers(data));
    const stopSyncProfileDB = database.syncProfiles((data)=>{
      handleProfileDB(data);
    });
    return ()=>{
      stopSyncOfferDB();
      stopSyncProfileDB();
      console.log('sync stoped');
    }
  },[]);
  return (
    <div className={styles.container}>
      <Seo title='login' />
      <main className={styles.main}>
        <h1>{welcomeText}</h1>
          <button onClick={()=>handleLogin()}>๋ก๊ทธ์ธํ๊ธฐ</button>
      </main>
      <style jsx>{`
      button{
        border:none;
        background:none;
        font-weight: bold;
        font-size: 12pt;
        cursor:pointer;
        transition: opacity 0.2s;
      }
      button:hover{
        opacity: 0.5;
      }
      `}</style>
    </div>
  )
}
