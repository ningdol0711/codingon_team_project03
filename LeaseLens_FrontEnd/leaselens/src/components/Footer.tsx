import github from '../assets/images/sns/icon _github.png'
import figma from '../assets/images/sns/icon _figma.png'
import notion from '../assets/images/sns/icon _notion.png'


export default function Footer() {
  return (
    <div className='foot_container'>
        <div className="foot_info">
            <p>brand : 리스렌즈</p>
            <p>e-mail : leaselens@gmail.com</p>
            <p>phone : 010 - 1234 - 5678</p>
            <p>address :  서울 마포구 숭문 4길 6, 스프레틱스 염리 사옥 1층</p>
            <br />
            <p>&copy; Copyright 2024. LeaseLens. All Rights Reserved.</p>
        </div>
        <div className="foot_sns">
            <a href="https://github.com/LeaseLens"><img src={github} alt="깃허브 아이콘" className='foot_github' /></a>
            <a href="https://www.figma.com/design/ytgpnnTv5Utm1zln4tdhYU/3rd_Project?node-id=89-184&t=W5WvfitHjFcoiq02-0"><img src={figma} alt="피그마 아이콘" className='foot_figma' /></a>
            <a href="https://good-popcorn-348.notion.site/3-186980741b2f4c1d8b3e0a12b3719b03?pvs=4"><img src={notion} alt="노션 아이콘" className='foot_notion' /></a>
        </div>
    </div>
  )
}
