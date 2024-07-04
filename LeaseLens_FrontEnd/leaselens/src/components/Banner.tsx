import { BannerProps } from '../types/types'

export default function Banner({ bannerTxt = "전체상품", onClick }: BannerProps) {
  return (
    <div className='banner_container' onClick={onClick}>
      <div className="banner_img"></div>
      <span className="banner_text">{bannerTxt}</span>
    </div>
  )
}
