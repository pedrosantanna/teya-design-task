import { ListGroup } from '../ListRow/ListRow';
import { RatingSummary } from '../RatingSummary/RatingSummary';
import { ReviewCard, ReviewCarousel } from './ReviewCard';

// One person who would go back and one who wouldn't, as rows of one grouped list, as on the shop page; the first is clamped to three lines.
export function ReviewCardExamples() {
  return (
    <ListGroup shadow>
      <ReviewCard position="first" up name="Priya" text="Loaf was waiting with my name on it. Still warm at 6." month="Oct 2026" lines={3} />
      <ReviewCard position="last" up={false} name="Callum" text="Delivery came an hour after the time they gave." month="Oct 2026" lines={3} />
    </ListGroup>
  );
}

// The shop page's Ratings: the summary card at 60%, then review cards at 80%, equal height, the next one peeking in.
export function ReviewCarouselExamples() {
  return (
    <ReviewCarousel accessibilityLabel="Ratings and reviews, 2 of 38" count={2}
      links={[
        { label: 'See all 38 reviews', onPress: () => {} },
        { label: 'How ratings work', onPress: () => {} },
      ]}
    >
      {(width) => (
        <>
          <RatingSummary
            width={width.summary}
            figure="92%"
            caption="would go back"
            detail="38 people"
            accessibilityLabel="Would go back, 92 percent of 38 people"
            tags={[
              { tag: 'Friendly', count: 31, up: true },
              { tag: 'Had it as promised', count: 24, up: true },
            ]}
          />
          <ReviewCard width={width.review} up name="Priya" text="Loaf was waiting with my name on it. Still warm at 6." month="Oct 2026" lines={5} />
          <ReviewCard width={width.review} up={false} name="Callum" text="Delivery came an hour after the time they gave." month="Oct 2026" lines={5} />
        </>
      )}
    </ReviewCarousel>
  );
}
