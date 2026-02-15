/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  const votes = {};
  const regVoters = new Set();

  function getWinner() {
    const res = getResults();

    return res ? res[0] : null;
  }

  function getResults(sortFn = (a, b) => b.votes - a.votes) {
    if (Object.keys(votes).length < 1) return null;
    const results = {};
    for (const candidate of candidates) {
      results[candidate.id] = {
        id: candidate.id,
        name: candidate.name,
        party: candidate.party,
        votes: 0,
      };
    }
    for (const voterId of Object.keys(votes)) {
      results[votes[voterId]].votes += 1;
    }

    return Object.values(results).sort(sortFn);
  }

  return {
    registerVoter: function registerVoter(voter) {
      if (
        typeof voter !== "object" ||
        voter === null ||
        typeof voter.id !== "string" ||
        typeof voter.name !== "string" ||
        typeof voter.age !== "number" ||
        !Number.isInteger(voter.age) ||
        voter.age < 18
      ) {
        return false;
      }
      if (!regVoters.has(voter.id)) {
        regVoters.add(voter.id);
        return true;
      }
      return false;
    },

    castVote: function castVote(voterId, candidateId, onSuccess, onError) {
      if (
        typeof voterId !== "string" ||
        typeof candidateId !== "string" ||
        !regVoters.has(voterId) ||
        !candidates.some((e) => e.id === candidateId) ||
        votes[voterId]
      ) {
        return onError("reason string");
      }
      votes[voterId] = candidateId;
      return onSuccess({ voterId, candidateId });
    },

    getResults,

    getWinner,
  };
}

export function createVoteValidator(rules) {
  if (typeof rules !== "object" || rules === null) {
    return "invalid";
  }
  return (voter) => {
    if (typeof voter !== "object" || voter === null) {
      return { valid: false, reason: "Invalid object" };
    }
    if (
      typeof voter.id !== "string" ||
      voter.id.trim().length <= 0 ||
      typeof voter.name !== "string" ||
      voter.name.trim().length <= 0 ||
      typeof voter.age !== "number" ||
      !Number.isInteger(voter.age) ||
      voter.age <= 0
    )
      return { valid: false, reason: "Invalid fields" };
    if (
      rules.hasOwnProperty("minAge") &&
      voter.age >= rules.minAge &&
      rules.hasOwnProperty("requiredFields") &&
      rules.requiredFields.every((e) => voter.hasOwnProperty(e))
    )
      return { valid: true, reason: "OKAY" };
    return { valid: false, reason: "Rules unmatched" };
  };
}

export function countVotesInRegions(regionTree) {
  if (typeof regionTree !== "object" || regionTree === null) return 0;

  let sum = 0;

  if (
    regionTree.votes &&
    typeof regionTree.votes === "number" &&
    Number.isFinite(regionTree.votes) &&
    regionTree.votes > 0
  ) {
    sum += regionTree.votes;
    if (
      Array.isArray(regionTree.subRegions) &&
      regionTree.subRegions.length > 0
    ) {
      for (const reg of regionTree.subRegions) sum += countVotesInRegions(reg);
    }
  }
  return sum;
}
//  2. createVoteValidator(rules)
//  *      - FACTORY: returns a validation function
//  *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
//  *      - Returned function takes a voter object and returns { valid, reason }
//  *
//  *   3. countVotesInRegions(regionTree)
//  *      - RECURSION: count total votes in nested region structure
//  *      - regionTree: { name, votes: number, subRegions: [...] }
//  *      - Sum votes from this region + all subRegions (recursively)
//  *      - Agar regionTree null/invalid, return 0
//  *
//  *   4. tallyPure(currentTally, candidateId)
//  *      - PURE FUNCTION: returns NEW tally object with incremented count
//  *      - currentTally: { "cand1": 5, "cand2": 3, ... }
//  *      - Return new object where candidateId count is incremented by 1
//  *      - MUST NOT modify currentTally
//  *      - If candidateId not in tally, add it with count 1
//  *
//  * @example
export function tallyPure(currentTally, candidateId) {
  if (typeof currentTally !== "object" || currentTally === null) return 0;
  let clone = structuredClone(currentTally);
  console.log(clone, "jdjd");
  for (const key of Object.keys(clone)) {
    if (candidateId === key) {
      clone[key] += 1;
      return clone;
    }
  }
  clone[candidateId] = 1;
  return clone;
}
