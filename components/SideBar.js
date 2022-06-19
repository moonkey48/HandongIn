import { useRouter } from 'next/router'

export default function SideBar({clicked}){
    const router = useRouter();
    return <section>
            <h3 className='logo'>Logo</h3>
            <h3 onClick={()=>router.push('/main')} className={clicked === 'Home'?'active':'unActive'}>Home</h3>
            <h3 onClick={()=>router.push('/Students')} className={clicked === 'Students'?'active':'unActive'}>Students</h3>
            <h3 onClick={()=>router.push('/Offers')} className={clicked === 'Offers'?'active':'unActive'}>Offers</h3>
        <style jsx>{`
        section{
            width:190px;
            height: 90vh;
            background-color: #fff;
            border-radius: 10px;
            padding:0 20px 20px 20px;
            border: 1px solid #EBEBED;
            box-shadow: 0px 4px 4px #F5F5F5;
        }
        .logo{
            color:#036EC3;
            border-bottom: 1px solid #EBEBED;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        h3{
            padding: 10px 0;
        }
        .active{
            color:#036EC3;
        }
        .unActive{
            color:#BABABA;
            cursor: pointer;
            transition: color 0.2s;
        }
        .unActive:hover{
            color:#036EC3;
        }
        `}</style>
    </section>
}