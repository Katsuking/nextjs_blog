import { gridItems } from '@/data'
import { BentoGrid, BentoGridItem } from './BentoGrid'

const Grid = () => {
  return (
    <section className="w-full p-5" id="about">
      <BentoGrid>
        {gridItems.map((el) => (
          <BentoGridItem
            id={el.id}
            key={el.id}
            title={el.title}
            description={el.description}
            img={el.img}
            imgClassName={el.imgClassName}
            titleClassName={el.titleClassName}
            className={el.className}
            spareImg={el.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

export default Grid
