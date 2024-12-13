import { YTypography, YBox } from "@/components/UI"
import { Col, Row } from "react-bootstrap"
import Image from "next/image"

export interface NoDataProps {
  title: string
  imageSource: string
  description?: string | React.ReactNode
  className?: string
  slot?: React.ReactNode
}

export function NoData({
  title,
  description,
  imageSource,
  slot,
  className,
}: NoDataProps) {
  return (
    <YBox
      className={className}
      body={
        <Row>
          <Col xxl={2} xl={3} md={4} sm={5}>
            <Image src={imageSource} alt={"no-data"} width={160} height={160} />
          </Col>
          <Col xxl={10} xl={9} md={8} sm={7}>
            <div className="d-flex flex-column w-100 h-100 justify-content-center">
              <YTypography variant={"caption-bold"} className="my-2">
                {title}
              </YTypography>
              {description && (
                <YTypography className="my-2">{description}</YTypography>
              )}
              {slot && <div>{slot}</div>}
            </div>
          </Col>
        </Row>
      }
    />
  )
}
