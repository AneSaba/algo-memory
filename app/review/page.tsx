import { ReviewSession } from './review-session'

export default function ReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Review</h1>
        <p className="text-muted-foreground text-sm mt-1">Work through your due problems</p>
      </div>
      <ReviewSession />
    </div>
  )
}
