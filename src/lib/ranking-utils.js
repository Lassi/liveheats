export const validateRanking = (ranks, numberOfStudents) => {
  if (ranks.length !== numberOfStudents) {
    return ({
      valid: false,
      error: 'a rank is required for each student',
    });
  }

  const parsedRanks = ranks.map(rank => parseInt(rank, 10));

  if (parsedRanks.some(rank => isNaN(rank)) || parsedRanks.some(rank => rank < 0)) {
    return ({
      valid: false,
      error: 'ranks can only be positive integers',
    });
  }

  const sortedRanks = [...parsedRanks].sort();

  if (sortedRanks.at(0) !== 1) {
    return ({
      valid: false,
      error: 'ranks need to start at 1',
    });
  }

  const dedupedRanks = new Set(sortedRanks);

  // If the set has the same size as the array, we don't have a tie
  if (dedupedRanks.size === sortedRanks.length) {
    const missingRankIndex = sortedRanks.findIndex((rank, index) => rank !== index + 1);

    if (missingRankIndex !== -1) {
      return ({
        valid: false,
        error: `a rank was skipped: ${missingRankIndex + 1}`,
      });
    }
  }

  for (let i = 1; i < sortedRanks.length; i++) {
    const prevRank = sortedRanks.at(i - 1);
    const currRank = sortedRanks.at(i);
    if (currRank !== i + 1 && currRank !== prevRank) {
      return ({
        valid: false,
        error: `incorrect rank after tie: ${currRank}`,
      });
    }
  }

  return ({ valid: true });
};
