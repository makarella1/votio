import { Nominations, Results, Rankings } from 'shared';

/* 
  Points for each vote will be calculated by the following formula: 
  ((votesPerVoter - 0.5 * n) / votesPerVoter)^(n + 1),
  where "n" corresponds to array index of some ranking.

  Notice that every vote has its own weight, the first vote
  will be the first by weight, the second vote will be 
  the second be weight, etc...
*/

export const getResults = (
  rankings: Rankings,
  nominations: Nominations,
  votesPerVoter: number,
): Results => {
  const scores: { [nominationId: string]: number } = {};

  Object.values(rankings).forEach((userRankings) => {
    userRankings.forEach((nominationId, n) => {
      const voteWeight = Math.pow(
        (votesPerVoter - 0.5 * n) / votesPerVoter,
        n + 1,
      );

      scores[nominationId] = (scores[nominationId] ?? 0) + voteWeight;
    });
  });

  const results: Results = Object.entries(scores).map(
    ([nominationId, score]) => ({
      nominationId,
      nominationText: nominations[nominationId].text,
      score,
    }),
  );

  return results.sort(
    (firstResult, secondResult) => secondResult.score - firstResult.score,
  );
};
