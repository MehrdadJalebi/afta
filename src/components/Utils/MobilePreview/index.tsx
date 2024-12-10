import "./index.scss"

export interface MobilePreviewProps {
  sender?: string
  message: string
}

export function MobilePreview({ sender, message }: MobilePreviewProps) {
  return (
    <div className="phone-container">
      <div className="phone-top">
        <div className="sender-section">{sender}</div>
      </div>
      <div className="phone-body">
        <div className="message-section">{message}</div>
      </div>
      <div className="phone-buttom">
        <div className="toggle-section">
          <div className="simple-circle small"></div>
        </div>
        <div className="simple-circle"></div>
        <div className="simple-circle"></div>
      </div>
    </div>
  )
}
