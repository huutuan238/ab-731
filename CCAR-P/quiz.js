/*
File dữ liệu quiz — được load riêng vào quiz.html qua <script src="quiz.js"></script>

Cấu trúc dữ liệu cho từng dạng quiz (mảng quizData, mỗi phần tử có field "type"):

1) Dạng Yes/No ("type": "yesno")
{
  "type": "yesno",
  "question": "...",
  "statements": ["phát biểu 1", "phát biểu 2", ...],
  "answers": ["Yes", "No", ...]   // đáp án đúng song song với statements
}

2) Dạng Dropdown ("type": "dropdown")
{
  "type": "dropdown",
  "question": "...",
  "statements": ["phát biểu 1", ...],
  "dropdowns": [["Yes","No"], ["A","B","C"], ...],  // lựa chọn dropdown cho từng dòng
  "answers": ["Yes", "B", ...]
}

3) Dạng chọn đáp án ("type": "choice") — dùng chung cho cả 1 đáp án đúng và nhiều đáp án đúng.
   Đây cũng là type MẶC ĐỊNH: nếu không khai báo "type" thì tự hiểu là "choice".
   Không cần khai báo single/multi riêng: nếu "answers" chỉ có 1 phần tử -> hành xử như chọn 1
   đáp án (radio, chọn cái này bỏ chọn cái khác). Nếu "answers" có từ 2 phần tử trở lên -> hành xử
   như chọn nhiều đáp án (checkbox, có thể chọn/bỏ chọn từng cái).
{
  "question": "...",          // không có "type" -> mặc định là "choice"
  "options": ["...", "...", "...", "..."],
  "answers": ["..."]          // 1 phần tử => single-choice
}
{
  "type": "choice",            // có thể ghi rõ hoặc bỏ trống, đều như nhau
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "answers": ["...", "..."]   // >= 2 phần tử => multi-choice
}
*/

const quizData = [
  {
    "question": "You are configuring tool permissions for a Claude-based assistant. The assistant's defined responsibilities require read access to a knowledge base and write access to a draft queue, and nothing else. Which scoping design best applies least privilege?",
    "options": [
      "Allow access to all tools with read permissions globally and restrict write permissions to the draftqueue tool, without scoping to only the specific tools required for defined tasks.",
      "Per-role allow-list of exactly the read-knowledge-base and write-draft-queue tools, enforced at the orchestration layer.",
      "Allow access to every tool in the catalog and rely on the model to decline tools it should not use.",
      "Disable all tools entirely to achieve a minimal permission surface, accepting that the assistant can no longer perform the read-knowledge-base or write-draft-queue tasks it was designed for."
    ],
    "answers": [
      "Per-role allow-list of exactly the read-knowledge-base and write-draft-queue tools, enforced at the orchestration layer."
    ]
  },
  {
    "question": "You are running a controlled experiment to compare two prompts and must complete the design steps before executing the experiment. Which two steps must be completed BEFORE running the experiment with random assignment? (Select two.) Each correct answer presents part of the solution.",
    "options": [
      "Determine the minimum detectable effect size and the sample size needed for power.",
      "Decide whether to promote, reject, or iterate the candidate based on the analysis.",
      "Define the hypothesis and the primary success metric for the comparison.",
      "Analyze the results against the predefined success metric and significance threshold.",
      "Document the recommendation, the trade-offs accepted, and the alternatives considered."
    ],
    "answers": [
      "Determine the minimum detectable effect size and the sample size needed for power.",
      "Define the hypothesis and the primary success metric for the comparison."
    ]
  },
  {
    "question": "You are reviewing a peer's Claude Code permission rules for an enterprise rollout. The rules grant unrestricted Bash access to all projects across all developers. Which response is most appropriate?",
    "options": [
      "Add unrestricted access to additional tool categories as well, so that Bash is not asymmetrically more permissive than other tools, expanding the attack surface further in the name of consistency.",
      "Approve the unrestricted Bash access as written on the grounds that narrowing the rules would add configuration complexity, accepting the full attack surface for all engineers across all projects.",
      "Replace unrestricted Bash with narrowly scoped tool patterns that allow only the specific commands the workflows require, and add explicit deny rules for sensitive operations.",
      "Disable all permission rules for the enterprise rollout so every command across every project runs without any tool-pattern scoping or explicit deny rules for sensitive operations."
    ],
    "answers": [
      "Replace unrestricted Bash with narrowly scoped tool patterns that allow only the specific commands the workflows require, and add explicit deny rules for sensitive operations."
    ]
  },
  {
    "question": "A senior architect is managing stakeholder expectations for a Claude-based reporting assistant midway through development. Stakeholders have escalating concerns about response latency. Which two actions most directly address stakeholder expectation alignment in this situation? (Select two.)",
    "options": [
      "Present measured p50 and p95 latency baselines against the agreed SLA thresholds so stakeholders have accurate data.",
      "Pause all development and reallocate engineering resources entirely to latency optimization.",
      "Communicate that latency concerns are a known LLM limitation and outside the architecture team's control.",
      "Replace the current Claude model with a third-party model that may offer lower latency without evaluation.",
      "Revise the SLA definition collaboratively with stakeholders if current targets are not achievable given production constraints."
    ],
    "answers": [
      "Present measured p50 and p95 latency baselines against the agreed SLA thresholds so stakeholders have accurate data.",
      "Revise the SLA definition collaboratively with stakeholders if current targets are not achievable given production constraints."
    ]
  },
  {
    "question": "You are supporting a team whose Claude Code sessions consistently load 60 or more MCP tools from many servers, exhausting context budget before the session begins. Which adjustment most directly addresses this issue without removing capability?",
    "options": [
      "Enable Tool Search so tool definitions are deferred and discovered on demand rather than loaded into context upfront.",
      "Disable every MCP server in the configuration to free up context budget, accepting that the team loses all tool access and cannot perform any MCP-dependent task in the session.",
      "Increase the prompt's verbosity with additional instructions and context, which consumes more of the context budget rather than reducing the tool-definition overhead causing the issue.",
      "Add additional MCP servers to give the team more capability, which increases rather than reduces the number of tool definitions loaded into the session's context budget."
    ],
    "answers": [
      "Enable Tool Search so tool definitions are deferred and discovered on demand rather than loaded into context upfront."
    ]
  },
  {
    "question": "You are reviewing an integration specification for security gaps. Which two findings constitute valid security gaps in the specification? (Select two.) Each correct answer presents a complete solution.",
    "options": [
      "Tool calls execute server-side under a least-privilege service principal scoped to the requested action.",
      "Service credentials are placed in the prompt context, where they can leak into logs and traces.",
      "Role-based access control is enforced only at the response-rendering layer after the model accesses restricted data.",
      "Per-user OAuth tokens are exchanged with scope-restricted permissions and refreshed within the active session.",
      "Tool inputs and outputs are encrypted in transit using transport-layer security between services."
    ],
    "answers": [
      "Service credentials are placed in the prompt context, where they can leak into logs and traces.",
      "Role-based access control is enforced only at the response-rendering layer after the model accesses restricted data."
    ]
  },
  {
    "question": "You are investigating an MCP server that fails on first launch but succeeds on subsequent runs. System permission dialogs appeared during the first launch. Which response is most appropriate?",
    "options": [
      "Recognize the first-run permission grant as the cause, document the expected behavior in onboarding guidance, and confirm that subsequent runs succeed.",
      "Reinstall the operating system to clear all permission state without first confirming whether the one- time permission grant caused the failure.",
      "Disable operating-system permission dialogs entirely, accept the resulting security implications, and proceed without confirming whether the failure recurs.",
      "Treat the first-run failure as a permanent fault, replace the MCP server, and do not verify whether subsequent runs succeed."
    ],
    "answers": [
      "Recognize the first-run permission grant as the cause, document the expected behavior in onboarding guidance, and confirm that subsequent runs succeed."
    ]
  },
  {
    "question": "A technical team is cataloguing risks specific to Claude's use in a document-grounded Q & A system. Which two items represent failure modes intrinsic to LLM-based systems rather than generic software defects? (Select two.)",
    "options": [
      "An expired TLS certificate blocks outbound API calls to Claude.",
      "A database connection timeout causes retrieval to return an empty result set.",
      "The model refuses a legitimate query because surface features trigger an overly broad safety pattern.",
      "A misconfigured load balancer routes requests to a deprecated API version.",
      "The model generates a plausible-sounding answer unsupported by any retrieved document."
    ],
    "answers": [
      "The model refuses a legitimate query because surface features trigger an overly broad safety pattern.",
      "The model generates a plausible-sounding answer unsupported by any retrieved document."
    ]
  },
  {
    "question": "You are running a risk assessment on a planned Claude-based deployment and must complete the inventory steps before assessing threats against assets. Which two steps must be completed BEFORE assessing threats against assets to estimate likelihood and impact? (Select two.) Each correct answer presents part of the solution.",
    "options": [
      "Document the assessment outcome with risks, mitigations, residual risk, and acceptance owners.",
      "Recommend mitigations and residual-risk acceptance for the risks that remain after analysis.",
      "Identify the assets that the deployment touches, along with the sensitivity of each asset.",
      "Recommend mitigations and residual-risk acceptance for risks that remain.",
      "Enumerate the threat actors and attack vectors relevant to the deployment."
    ],
    "answers": [
      "Identify the assets that the deployment touches, along with the sensitivity of each asset.",
      "Enumerate the threat actors and attack vectors relevant to the deployment."
    ]
  },
  {
    "question": "You are compiling guardrail tactics for a customer-facing assistant. Which two tactics belong on the guardrail list? Each correct answer presents a complete solution.",
    "options": [
      "Embed approved override phrases that let trusted users relax guardrails on demand.",
      "Lower sampling temperature globally to reduce the chance of off-policy completions.",
      "Validate the model output against a structured schema before downstream actions are taken.",
      "Layer prompt-level guardrails with runtime content checks rather than relying on either alone.",
      "Rely on a single hardened system prompt that enumerates every disallowed behavior."
    ],
    "answers": [
      "Validate the model output against a structured schema before downstream actions are taken.",
      "Layer prompt-level guardrails with runtime content checks rather than relying on either alone."
    ]
  },
  {
    "question": "You are diagnosing a Claude Code session whose subagent uses 50,000 tokens of context before the engineer types a single message. Which root cause is most likely?",
    "options": [
      "The developer's keyboard layout or input-method configuration is the cause of the elevated context consumption, introducing extra tokens before the engineer types any message.",
      "Many MCP servers are configured, each contributing tool definitions to the context budget; Tool Search is not enabled, so all definitions load upfront.",
      "The model has internal personal preferences or default behaviors that silently consume large portions of context budget before any user message is processed, independent of tool configuration.",
      "The font rendering or display-scaling settings of the IDE are converting visual output into additional context tokens, causing the high pre-session context consumption."
    ],
    "answers": [
      "Many MCP servers are configured, each contributing tool definitions to the context budget; Tool Search is not enabled, so all definitions load upfront."
    ]
  },
  {
    "question": "A team manager wants all engineers working on the same repository to share identical MCP server definitions without manual synchronization. Which configuration approach satisfies this requirement?",
    "options": [
      "managed configuration pushed to all endpoints by the administrator",
      "environment variables set at the operating-system level on each workstation",
      "project-scope .claude/settings.json and .mcp.json files committed to the repository",
      "each engineer maintains a personal ~/.claude/settings.json with the shared definitions"
    ],
    "answers": [
      "project-scope .claude/settings.json and .mcp.json files committed to the repository"
    ]
  },
  {
    "question": "You are supporting an engineer whose Claude Code session reports a permission denial when the engineer expected the action to be allowed. Which resolution step is most appropriate?",
    "options": [
      "Tell the engineer to retry the denied action verbatim repeatedly until the denial stops appearing, without inspecting the active permission rules to determine whether the denial is intentional.",
      "Disable the permission system entirely across all scopes to remove the denial, eliminating all toolpattern and deny-rule controls rather than identifying and amending the specific rule.",
      "Inspect the active permission rules across all scopes-managed, command-line, local, project, and user-to identify which rule is denying the action and confirm whether it should be amended or remain denied.",
      "Grant the engineer unrestricted Bash access to bypass the specific rule causing the denial, removing all tool-pattern constraints rather than amending only the rule in question."
    ],
    "answers": [
      "Inspect the active permission rules across all scopes-managed, command-line, local, project, and user-to identify which rule is denying the action and confirm whether it should be amended or remain denied."
    ]
  },
  {
    "question": "You are integrating Claude Code into the team's pull-request workflow. The team wants AIassisted review without removing human approval. Which integration design best fits this requirement?",
    "options": [
      "Claude Code reviews the pull request and posts a structured analysis as a comment, while a human reviewer retains the approval decision under the existing branch-protection rules.",
      "Claude Code merges every pull request automatically after completing its analysis, bypassing human approval and the existing branch-protection rules.",
      "Claude Code disables all existing branch-protection rules to streamline the merge process, removing human approval as a required gate.",
      "Claude Code silently deletes pull requests it assesses as low quality without posting a comment or notifying the author."
    ],
    "answers": [
      "Claude Code reviews the pull request and posts a structured analysis as a comment, while a human reviewer retains the approval decision under the existing branch-protection rules."
    ]
  },
  {
    "question": "A platform team operates a self-hosted multi-agent system on Kubernetes that orchestrates seven specialized agents for invoice processing. The team spends approximately 40 percent of engineering capacity on infrastructure maintenance, message bus reliability, and agent state recovery. The CFO has asked you to evaluate moving to managed agent infrastructure to reclaim engineering capacity. The security officer requires that all customer financial data remain within an approved network boundary. Which factor should most heavily influence your recommendation?",
    "options": [
      "Whether the current seven agents map cleanly to the patterns supported by managed agents.",
      "Whether managed agents reduce per-invoice token costs across the existing processing volume.",
      "Whether managed agents support the current bus topology used by the platform team.",
      "Whether managed agent data handling satisfies the network boundary required by security."
    ],
    "answers": [
      "Whether managed agent data handling satisfies the network boundary required by security."
    ]
  },
  {
    "question": "You are producing an architecture guide for a new deployment and must complete the planning steps before drafting each section. Which two steps must be completed BEFORE drafting each section of the guide? (Select two.) Each correct answer presents part of the solution.",
    "options": [
      "Identify the audience and the questions the guide must answer for that audience.",
      "Translate the guide into the supported regional languages for the candidate population.",
      "Validate the guide with the implementation team and incorporate corrections.",
      "Establish the document under version control with a defined review cadence and approver list.",
      "Outline the guide sections covering the overview, components, contracts, flows, runbooks, and limitations."
    ],
    "answers": [
      "Identify the audience and the questions the guide must answer for that audience.",
      "Outline the guide sections covering the overview, components, contracts, flows, runbooks, and limitations."
    ]
  },
  {
    "question": "You are evaluating retrieval-strategy claims used by a peer team. For each claim, select yes if the statement is generally accurate. Otherwise, select no.",
    "options": [
      "Yes-Yes-Yes-No-No",
      "Yes-No-Yes-No-No",
      "No-Yes-Yes-No-No",
      "Yes-No-No-No-No",
      "Yes-Yes-Yes-No-Yes",
    ],
    "answers": [
      "Yes-Yes-Yes-No-No",
    ],
     "image": "./CCAR-P/no17.png"
  },
  {
    "question": "A Claude-based research assistant begins producing responses that confidently contradict its retrieved source documents despite no change to the retrieval pipeline. Which two diagnostic actions most directly identify the root cause of this behavior? (Select two.)",
    "options": [
      "Increase the context-window size to allow more retrieved chunks per query.",
      "Switch the retrieval index to a denser embedding model to improve chunk-relevance scores.",
      "Determine whether the failure reproduces on the previous model version to test for a model mismatch.",
      "Reduce the temperature setting to lower response variance across all query types.",
      "Inspect the system-prompt grounding instructions to determine whether citation constraints remain intact."
    ],
    "answers": [
      "Determine whether the failure reproduces on the previous model version to test for a model mismatch.",
      "Inspect the system-prompt grounding instructions to determine whether citation constraints remain intact."
    ]
  },
  {
    "question": "A solutions architect is analyzing stakeholder feedback collected after the first quarter of a Claude-powered procurement automation deployment. The feedback includes four statements: (1) \"Our procurement team is processing 3x more purchase orders per analyst per day.\" (2) \"We have eliminated the manual data entry role entirely and redeployed those staff to vendor relationship management.\" (3) \"The API integration costs are running 40% over the projected per-transaction budget.\" (4) \"Response latency during end-of-month batch runs is averaging 11 seconds, against our committed 5-second SLA.\" Which of the following correctly identifies the primary business value pillar each stakeholder statement represents?",
    "options": [
      "Statement 1: Efficiency; Statement 2: Transformation; Statement 3: Solution Cost; Statement 4: Performance SLA",
      "Statement 1: Productivity; Statement 2: Efficiency; Statement 3: Solution Cost; Statement 4: Performance SLA",
      "Statement 1: Transformation; Statement 2: Productivity; Statement 3: Solution Cost; Statement 4: Efficiency",
      "Statement 1: Efficiency; Statement 2: Productivity; Statement 3: Performance SLA; Statement 4: Solution Cost"
    ],
    "answers": [
      "Statement 1: Efficiency; Statement 2: Transformation; Statement 3: Solution Cost; Statement 4: Performance SLA"
    ]
  },
  {
    "question": "You are a solution architect evaluating candidate use cases for a Claude-based program. For each scenario, select Yes if Claude is appropriate as the primary solution at the architectural level. Otherwise, select No.",
    "options": [
      "Yes-No-Yes-No-Yes",
      "No-No-Yes-Yes-Yes",
      "Yes-Yes-Yes-No-Yes",
      "Yes-No-No-No-Yes",
      "Yes-No-No-Yes-Yes",
      "No-No-No-Yes-No",
    ],
    "answers": [
      "Yes-No-Yes-No-Yes",
    ],
    "image": "./CCAR-P/no20.png"
  },
  {
    "question": "You are an architect supporting the iteration phase of a deployed Claude-based system. Which activity most directly fits this phase?",
    "options": [
      "Rebuild the entire system architecture from scratch at the start of every iteration cycle regardless of what production telemetry, evaluations, and stakeholder feedback indicate is needed.",
      "Stop measuring production outcomes once the deployment has successfully launched, treating the go-live milestone as the end of the evaluation and iteration cycle.",
      "Discard the evaluation framework and reference set once the deployment is in production, accepting that future iterations will have no structured basis for measuring the impact of changes.",
      "Review production telemetry, sampled output evaluations, and stakeholder feedback to identify the highest-impact change for the next cycle, then plan the change against the evaluation framework."
    ],
    "answers": [
      "Review production telemetry, sampled output evaluations, and stakeholder feedback to identify the highest-impact change for the next cycle, then plan the change against the evaluation framework."
    ]
  },
  {
    "question": "You are classifying chunking strategies by the corpus type each is best suited to. For each chunking strategy, select the appropriate corpus type: \"Long Structured Documents,\" \"Heterogeneous Short Records,\" or \"Code or Hierarchical Specifications.\"",
    "options": [
      "Code or Hierarchical Specifications-Code or Hierarchical Specifications-Heterogeneous Short Records-Long Structured Documents-Heterogeneous Short Records-Long Structured Documents",
      "Code or Hierarchical Specifications-Long Structured Documents-Heterogeneous Short Records-Long Structured Documents-Long Structured Documents-Long Structured Documents",
      "Code or Hierarchical Specifications-Code or Hierarchical Specifications-Heterogeneous Short Records-Long Structured Documents-Code or Hierarchical Specifications-Long Structured Documents",
      "Code or Hierarchical Specifications-Long Structured Documents-Heterogeneous Short Records-Long Structured Documents-Code or Hierarchical Specifications-Long Structured Documents",
      "Long Structured Documents-Code or Hierarchical Specifications-Heterogeneous Short Records-Long Structured Documents-Code or Hierarchical Specifications-Long Structured Documents",
      "Long Structured Documents-Code or Hierarchical Specifications-Code or Hierarchical Specifications-Long Structured Documents-Code or Hierarchical Specifications-Long Structured Documents",
      
    ],
    "answers": [
      "Code or Hierarchical Specifications-Code or Hierarchical Specifications-Heterogeneous Short Records-Long Structured Documents-Heterogeneous Short Records-Long Structured Documents",
    ],
    "image": "./CCAR-P/no22.png"
  },
  {
    "question": "You are evaluating prompting claims in a peer's design document. For each claim, select yes if the claim reflects sound practice. Otherwise, select no.",
    "options": [
      "Yes-Yes-No-Yes-No",
      "Yes-No-No-Yes-Yes",
      "No-Yes-No-Yes-No",
      "Yes-Yes-Yes-No-No",
      "Yes-No-No-Yes-No",
      "Yes-No-Yes-Yes-No",
    ],
    "answers": [
      "Yes-Yes-No-Yes-No",
    ],
    "image": "./CCAR-P/no23.png"
  },
  {
    "question": "You are assessing a Claude-based system whose dominant risk is silent quality drift on safety-relevant outputs after a model-version upgrade. Which assessment activity most directly addresses this risk?",
    "options": [
      "Disable adversarial evaluation entirely during model-version upgrade cycles to reduce evaluation cost, accepting that safety drift will go undetected until it appears in production.",
      "Rotate adversarial inputs randomly so no two upgrades are scored on the same set.",
      "Skip evaluation on each model-version upgrade and rely on user-submitted complaints to surface safety drift after the upgraded model has already served production traffic.",
      "Maintain an adversarial evaluation set with version-attributed scoring so each upgrade is measured against the same set before promotion."
    ],
    "answers": [
      "Maintain an adversarial evaluation set with version-attributed scoring so each upgrade is measured against the same set before promotion."
    ]
  },
  {
    "question": "You are responding to an adversarial input pattern in which users include text claiming admin authority and instructing the model to bypass safety restrictions. Which combination of controls most effectively mitigates this attack pattern?",
    "options": [
      "Trusting that the model will intrinsically recognize and reject all bypass attempts without prompt-level instructions, runtime classifiers, scoped permissions, or audit logging.",
      "Prompt-level instructions that treat user content as untrusted data, runtime classifiers that detect override attempts, scoped tool permissions that cannot be elevated by user content, and audit logging of attempts.",
      "Removing all safety restrictions and guardrails to eliminate the attack surface that bypass attempts target, accepting that this makes the assistant unrestricted for all inputs.",
      "Granting users any privilege level they assert in their message content, on the assumption that cooperative behavior requires honoring self-declared authority without independent verification."
    ],
    "answers": [
      "Prompt-level instructions that treat user content as untrusted data, runtime classifiers that detect override attempts, scoped tool permissions that cannot be elevated by user content, and audit logging of attempts."
    ]
  },
  {
    "question": "An operations engineer reports that a Claude-based pipeline began returning malformed JSON responses after a scheduled maintenance window, causing downstream processing failures. Which two investigative steps most directly isolate the root cause? (Select two.)",
    "options": [
      "Clear the prompt cache and resubmit all pending requests to eliminate stale cached prefixes.",
      "Compare the current system prompt and output schema configuration against the last known good version from before the maintenance window.",
      "Switch to a different Claude model tier to rule out provider-side changes as a contributing factor.",
      "Increase the max_tokens limit to determine whether output truncation is causing incomplete JSON structures.",
      "Replay a set of pre-maintenance requests against the current configuration and inspect the raw model output before downstream parsing."
    ],
    "answers": [
      "Compare the current system prompt and output schema configuration against the last known good version from before the maintenance window.",
      "Replay a set of pre-maintenance requests against the current configuration and inspect the raw model output before downstream parsing."
    ]
  },
  {
    "question": "Engineering leadership wants to roll out Claude Skills to 280 developers across 14 teams. Skills will encode internal coding standards, code-review checklists, and incident-postmortem templates. Leadership has asked how to govern Skill authorship so that Skills remain trustworthy without bottlenecking on a single central team. Which governance model should you recommend?",
    "options": [
      "Per-developer authorship across the 280 engineers with no team-level coordination required.",
      "Centralized authorship by a single platform team responsible for every Skill produced.",
      "Fully decentralized authorship across the 14 teams with no review before publication.",
      "Federated authorship across the 14 teams with a central review and publication gate."
    ],
    "answers": [
      "Federated authorship across the 14 teams with a central review and publication gate."
    ]
  },
  {
    "question": "You are transitioning a Claude-based deployment from design into implementation. Which handoff package most directly supports a clean transition?",
    "options": [
      "The most recent set of design presentation slides without component-level diagrams, interface contracts, an evaluation framework with a reference set, runbooks, or a known-limitations register.",
      "A verbal walkthrough conducted on the day of handoff with no written architecture overview, ADRs, component contracts, evaluation framework, runbooks, playbook, or known limitations.",
      "Architecture overview, ADRs, component contracts, evaluation framework with reference set, runbooks, on-call playbook, and known limitations.",
      "Source code alone with no integrating architecture overview, ADRs, component contracts, evaluation framework, runbooks, on-call playbook, or known-limitations register to support the delivery team."
    ],
    "answers": [
      "Architecture overview, ADRs, component contracts, evaluation framework with reference set, runbooks, on-call playbook, and known limitations."
    ]
  },
  {
    "question": "A security audit uncovers two issues: (1) all end users share a single API key, and (2) tool calls are executed without logging the initiating user. Which two mitigations directly address these specific findings? (Select two.)",
    "options": [
      "Validate structured outputs against a schema before downstream actions are executed.",
      "Enforce RBAC at the retrieval layer before content enters the model context.",
      "Move credentials out of the prompt context and resolve them from a server-side secret store.",
      "Add actor attribution to tool-call logs so each call records the initiating user identity.",
      "Replace the shared API key with per-user OAuth tokens carrying scope-restricted permissions."
    ],
    "answers": [
      "Add actor attribution to tool-call logs so each call records the initiating user identity.",
      "Replace the shared API key with per-user OAuth tokens carrying scope-restricted permissions."
    ]
  },
  {
    "question": "An architect is reviewing a Claude-based candidate-screening tool prior to deployment. A stakeholder asserts that because the model was not trained on company data, no bias evaluation is necessary. Which two responses most accurately challenge this assertion? (Select two.)",
    "options": [
      "Transparency obligations are satisfied by disclosing that an AI system is in use, without further evaluation.",
      "Fairness testing is required only when the training dataset is known to contain protected-class labels.",
      "The model may carry demographic biases from pretraining that manifest in screening outcomes regardless of fine-tuning.",
      "The system should be evaluated on outcome-disparity metrics across protected groups before deployment.",
      "Bias evaluation is unnecessary when the model provider has published a responsible-use policy."
    ],
    "answers": [
      "The model may carry demographic biases from pretraining that manifest in screening outcomes regardless of fine-tuning.",
      "The system should be evaluated on outcome-disparity metrics across protected groups before deployment."
    ]
  },
  {
    "question": "You are distinguishing functional from non-functional requirements during discovery. Which item is a non-functional requirement?",
    "options": [
      "The system must extract a defined set of specific fields from invoice attachments and populate a downstream data record.",
      "The system must produce a draft response that a human reviewer can edit before sending.",
      "The system must classify inbound tickets into a defined set of categories.",
      "The system must respond at p95 latency under 800 milliseconds at the expected request volume."
    ],
    "answers": [
      "The system must respond at p95 latency under 800 milliseconds at the expected request volume."
    ]
  },
  {
    "question": "You are sequencing decomposed components in an invoice-processing pipeline. For each of the decomposed components, select the execution layer it belongs to: \"Pre-Processing,\" \"Model Stage,\" or \"Post-Processing.\"",
    "options": [
      "Model Stage->Post-Processing->Post-Processing->Model Stage>Pre-Processing->Pre-Processing",
      "Model Stage->Model Stage>->Post-Processing->Model Stage>Pre-Processing->Post-Processing",
      "Model Stage->Post-Processing->Pre-Processing->Model Stage>Pre-Processing->Post-Processing",
      "Post-Processing->Pre-Processing->Post-Processing->Model Stage>Pre-Processing->Pre-Processing",
      "Pre-Processing->Post-Processing->Post-Processing->Model Stage>Pre-Processing->Model Stage",
      "Post-Processing>Post-Processing->Model Stage->Model Stage>Pre-Processing->Pre-Processing",
      "Pre-Processing->Post-Processing->Post-Processing->Model Stage>Model Stage->Pre-Processing",
    ],
    "answers": [
      "Model Stage->Post-Processing->Post-Processing->Model Stage>Pre-Processing->Pre-Processing",
    ],
    "image": "./CCAR-P/no32.png"
  },
  {
    "question": "A pilot AI assistant for procurement specialists shows 89 percent first-response acceptance, but follow-up surveys reveal that specialists frequently override the assistant's vendor recommendations after considering criteria the assistant did not evaluate. The pilot owner wants to ship the assistant unchanged because of the strong acceptance rate. Which two Discernment-competency observations should you raise BEFORE approving the launch? (Select two.)",
    "options": [
      "The acceptance rate alone proves readiness for general production use.",
      "The survey response rate may not be statistically representative of all specialists.",
      "The unconsidered criteria represent a scope gap in the assistant's input space.",
      "Acceptance does not establish whether recommendations remain correct after specialist review.",
      "The pilot duration was probably too short to demonstrate reliability across the full year."
    ],
    "answers": [
      "The unconsidered criteria represent a scope gap in the assistant's input space.",
      "Acceptance does not establish whether recommendations remain correct after specialist review."
    ]
  },
  {
    "question": "A revenue projection assistant has missed its monthly cost target by 38 percent. Profiling shows three contributors: a 6,000-token policy preamble repeated on every call (45 percent of cost), retrieval of historical sales chunks averaging 3,000 tokens per call (30 percent), and inference on a flagship-tier model (25 percent). Stakeholders require that projection accuracy remain unchanged. Which two optimizations should you sequence first to reduce cost without affecting accuracy? (Select two.) Each correct answer presents part of the solution.",
    "options": [
      "Reduce the number of historical sales chunks retrieved across each query run.",
      "Truncate the policy preamble to remove non-essential clauses from the prompt.",
      "Enable prompt caching on the static policy preamble across the recurring calls.",
      "Switch the workload to a smaller, faster Claude model tier across all queries.",
      "Cache common retrieved sales chunks accessed across many of the daily queries."
    ],
    "answers": [
      "Enable prompt caching on the static policy preamble across the recurring calls.",
      "Cache common retrieved sales chunks accessed across many of the daily queries."
    ]
  },
  {
    "question": "A technical team is debating whether to implement a new capability for generating regulatory filings from internal data as a Claude Skill or as an MCP server. The capability requires a fixed authoring procedure with embedded examples, does not need to call live external systems, and must be portable across three Claude deployments: claude.ai, an internal API integration, and Claude Code. Which factor most strongly favors implementing the capability as a Skill?",
    "options": [
      "The capability needs to query a live database for the most recent regulatory filings.",
      "The capability must also be callable from a developer's command-line interface.",
      "The capability requires direct authentication against the corporate identity provider.",
      "The capability is procedural knowledge with no live external-system calls required."
    ],
    "answers": [
      "The capability is procedural knowledge with no live external-system calls required."
    ]
  },
  {
    "question": "You are auditing a procurement-assistant agent whose defined responsibility is to draft purchase requests for review. For each tool currently configured on the agent, select yes if the tool should remain after a leastprivilege audit. Otherwise, select no if it should be removed.",
    "options": [
      "Yes-No-Yes-No-Yes",
      "Yes-Yes-Yes-No-Yes",
      "No-No-Yes-No-Yes",
      "No-No-No-No-Yes",
      "Yes-Yes-Yes-No-No",
    ],
    "answers": [
      "Yes-No-Yes-No-Yes",
    ],
    "image": "./CCAR-P/no36.png"
  },
  {
    "question": "You are evaluating model-selection claims used by a peer team. For each statement, select yes if the statement is generally true. Otherwise, select no.",
    "options": [
        "Yes-Yes-No-Yes-No",
        "Yes-No-No-Yes-Yes",
        "No-Yes-No-Yes-No",
        "Yes-Yes-No-No-No",
        "Yes-No-No-Yes-Yes",
    ],
    "answers": [
      "Yes-Yes-No-Yes-No",
    ],
    "image": "./CCAR-P/no37.png"
  },
  {
    "question": "The engineering lead at Trenova Systems, Inc. is evaluating two proposals for improving developer workflows using Claude-assisted tooling. Proposal A adds Claude Code to the IDE for inline code generation and review. Proposal B routes all code-generation requests through a shared Slack bot without IDE integration. Which two observations most accurately evaluate these proposals against workflow-improvement objectives? (Select two.)",
    "options": [
      "Proposal B is superior because centralizing requests in Slack creates an auditable log of all codegeneration activity.",
      "Proposal B introduces workflow friction by requiring developers to leave the IDE, undermining the productivity objective.",
      "Proposal A reduces context switching by providing AI assistance at the point of development without requiring a separate tool.",
      "Proposal B improves workflow velocity because Slack notifications create an asynchronous review queue.",
      "Both proposals are equivalent because the model capabilities are identical regardless of the integration point."
    ],
    "answers": [
      "Proposal B introduces workflow friction by requiring developers to leave the IDE, undermining the productivity objective.",
      "Proposal A reduces context switching by providing AI assistance at the point of development without requiring a separate tool."
    ]
  },
  {
    "question": "A document analysis service processes legal filings averaging 80,000 tokens each. Each filing is queried by attorneys an average of 14 times during a case. The current architecture sends the full filing on every query. The CFO has asked you to reduce per-query costs while preserving response quality. The security officer requires that filing contents not be stored outside Fabrikam's tenancy. Which optimization approach should you recommend?",
    "options": [
      "Summarize each filing once at intake and run all subsequent queries against the summary.",
      "Cache the filing as the prompt prefix for reuse across the 14 queries per case.",
      "Index filings in a vector store and retrieve only the relevant passages per query.",
      "Move the workload to a smaller Claude model to reduce the per-token cost paid."
    ],
    "answers": [
      "Cache the filing as the prompt prefix for reuse across the 14 queries per case."
    ]
  },
  {
    "question": "You are designing a test strategy for a Claude-based pipeline that handles sensitive financial data. Which two test types should be prioritized to cover both safety under attack and cross-component correctness? (Select two.)",
    "options": [
      "Adversarial tests using prompt-injection and malformed-input cases.",
      "Regression tests against a stable reference set of previously known-good outputs.",
      "Smoke tests that verify core paths after each deployment.",
      "Integration tests that verify end-to-end pipeline behavior across all components.",
      "Unit tests targeting only individual prompt-template rendering logic."
    ],
    "answers": [
      "Adversarial tests using prompt-injection and malformed-input cases.",
      "Integration tests that verify end-to-end pipeline behavior across all components."
    ]
  },
{
  "question": "The platform team at Trenova Systems, Inc. needs to reduce per-query cost and p95 latency for a high-volume Claude pipeline without degrading output quality on the core use case. Which two optimizations directly target both cost and latency simultaneously? (Select two.)",
  "options": [
    "Enable prompt caching on the static system-prompt prefix to reduce billable input tokens on repeated calls.",
    "Route straightforward query types to a smaller, faster Claude model and reserve the full model for complex cases.",
    "Increase max_tokens to reduce the frequency of truncated responses requiring follow-up calls.",
    "Add a retrieval step that fetches the full source corpus into the context window before generation.",
    "Expand the system prompt to include additional few-shot examples on every request."
  ],
  "answers": [
    "Enable prompt caching on the static system-prompt prefix to reduce billable input tokens on repeated calls.",
    "Route straightforward query types to a smaller, faster Claude model and reserve the full model for complex cases."
  ]
},
{
  "question": "You are evaluating a Claude-based deployment for adherence to a specific regulation. Which two steps must be completed BEFORE mapping deployment data flows to specific regulatory clauses? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Compare the in-place controls against the regulatory requirements to identify any compliance gaps.",
    "Identify the applicability of the regulation based on data types, jurisdiction, and audience.",
    "Schedule the remediation work with the engineering team based on the prioritized gap findings.",
    "Document the identified gaps along with recommended remediations and residual risk for signoff.",
    "Inventory the vendor-provided compliance tooling and confirm which compliance affordances are in place."
  ],
  "answers": [
    "Identify the applicability of the regulation based on data types, jurisdiction, and audience.",
    "Inventory the vendor-provided compliance tooling and confirm which compliance affordances are in place."
  ]
},
{
  "question": "A research summarization assistant has been deployed for six months. A user has flagged that a generated summary contained a fabricated citation. The product team has asked whether the incident requires architectural action or whether it is an isolated case. Which two Diligence-competency actions should you take? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Sample recent summaries to estimate the fabrication frequency across the population.",
    "Disable the assistant immediately for all current users without any prior diagnostic analysis.",
    "Review whether citation-grounding controls exist anywhere in the current generation pipeline.",
    "Communicate to users that the assistant does not fabricate output as a matter of design.",
    "Treat the incident as an anecdotal isolated case and take no further investigative action."
  ],
  "answers": [
    "Sample recent summaries to estimate the fabrication frequency across the population.",
    "Review whether citation-grounding controls exist anywhere in the current generation pipeline."
  ]
},
{
  "question": "You are selecting a model for a new production workload and must complete the upstream steps before testing candidate models empirically. Which two steps must be completed BEFORE running a representative sample on a candidate model? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Select the lightest model that consistently meets the quality bar across the sample.",
    "Retest the model choice when a new model version becomes available.",
    "Choose a candidate model based on the requirements profile and known capabilities.",
    "Define the quality bar, latency tolerance, and expected volume for the workload.",
    "Sign off the production rollout plan with the platform and security teams."
  ],
  "answers": [
    "Choose a candidate model based on the requirements profile and known capabilities.",
    "Define the quality bar, latency tolerance, and expected volume for the workload."
  ]
},
{
  "question": "You are preparing an operational runbook for a Claude-based service. Which content is essential to include in the runbook?",
  "options": [
    "Dashboard and log references only, without alert definitions, triage steps, escalation paths, or rollback procedures for the on-call engineer to act on.",
    "Common alerts and their triage steps, escalation paths, rollback procedures, and references to the relevant dashboards and logs.",
    "Alert definitions and triage steps only, without escalation paths, rollback procedures, or references to dashboards and logs for on-call use.",
    "Escalation paths and rollback procedures only, without alert definitions, triage steps, or dashboard references to guide initial incident response."
  ],
  "answers": ["Common alerts and their triage steps, escalation paths, rollback procedures, and references to the relevant dashboards and logs."]
},
{
  "question": "You are designing a feedback session for a deployment in flight. Which structure best supports productive stakeholder feedback?",
  "options": [
    "Hold an open-ended meeting with no pre-distributed agenda or artifacts, and rely on participants' memory to carry decisions and follow-up owners forward.",
    "Define a focused agenda, share the artifacts in advance, capture decisions and follow-ups in writing, and confirm action owners and dates.",
    "Distribute artifacts at the session start rather than in advance, so stakeholders review materials in real time without preparation before the discussion begins.",
    "End the session without recording decisions, follow-up items, action owners, or dates, relying on participant memory to carry the session's outcomes forward."
  ],
  "answers": ["Define a focused agenda, share the artifacts in advance, capture decisions and follow-ups in writing, and confirm action owners and dates."]
},
{
  "question": "You are integrating AI-assisted tooling into the team's documentation workflow. The team wants generated documentation that stays grounded in the actual code. Which integration approach best fits this requirement?",
  "options": [
    "Generate documentation from the model's training-data recall without reading any of the actual repository code, accepting that the output will not reflect the current implementation.",
    "Have the subagents publish generated documentation directly to the public-facing site without passing through the team's normal review workflow or any human approval step.",
    "Configure subagents that read the relevant code files via filesystem and code-search tools, generate the documentation, and emit changes through the team's normal review workflow.",
    "Disable all filesystem and code-search tools so the subagents cannot read any repository code, accepting that documentation generation will be entirely disconnected from the actual implementation."
  ],
  "answers": ["Configure subagents that read the relevant code files via filesystem and code-search tools, generate the documentation, and emit changes through the team's normal review workflow."]
},
{
  "question": "You are reviewing a peer's end-to-end design for a Claude-based platform expected to scale to thousands of concurrent users. For each statement, indicate Yes if it reflects sound architectural practice. Otherwise, select No.",
  "options": [
    "Yes-Yes-No-No",
    "No-Yes-No-No",
    "Yes-Yes-No-Yes",
    "Yes-No-No-No",
    "Yes-Yes-Yes-No",
  ],
  "answers": [
    "Yes-Yes-No-No",
  ],
  "image": "./CCAR-P/no49.png"
},
{
  "question": "You are presenting an architectural decision to a mixed audience that includes an executive sponsor and the engineering leads who will implement the decision. Which presentation strategy best serves both audiences?",
  "options": [
    "Open with a deep dive into low-level implementation details targeted at engineering leads, and stop there without addressing the business outcomes or trade-offs the executive sponsor needs.",
    "Lead with the decision, the business outcomes it serves, and the trade-offs accepted; follow with the technical rationale, alternatives, and implementation implications for the engineering audience.",
    "Skip the rationale, alternatives, and trade-off discussion entirely and simply announce the chosen decision, leaving both audiences without the context needed to implement or validate it.",
    "Present a single undifferentiated narrative that addresses technical and business concerns with equal weight throughout, treating both audiences as requiring the same depth on every section."
  ],
  "answers": ["Lead with the decision, the business outcomes it serves, and the trade-offs accepted; follow with the technical rationale, alternatives, and implementation implications for the engineering audience."]
},
{
  "question": "You are selecting a pattern for a compliance Q & A assistant that must answer policy questions with citations to the authoritative internal source set. Latency, cost, and audit predictability are prioritized. Which pattern is the best fit?",
  "options": [
    "Augmented LLM with retrieval-augmented generation over the indexed authoritative corpus and citation rendering on each answer.",
    "Multi-agent orchestration with a planner, researcher, and writer agent for every query.",
    "A pure agent loop with open web-browsing tools to surface the most current policy information, without constraining retrieval to the authoritative internal corpus.",
    "A static prompt with the entire policy corpus concatenated into every request."
  ],
  "answers": ["Augmented LLM with retrieval-augmented generation over the indexed authoritative corpus and citation rendering on each answer."]
},
{
  "question": "A security team is evaluating two proposed controls. Control A adds an outbound tool allowlist with destination restrictions and per-call review. Control B scores responses against a stable adversarial evaluation set after each model-version change. Which two risk categories are correctly matched to these controls? (Select two.)",
  "options": [
    "Control A - prompt injection from adversarial content in retrieved data",
    "Control A - silent quality drift after a model-version upgrade",
    "Control A - data exfiltration via outbound tool calls",
    "Control B - data exfiltration via outbound tool calls",
    "Control B - silent quality drift after a model-version upgrade"
  ],
  "answers": [
    "Control A - data exfiltration via outbound tool calls",
    "Control B - silent quality drift after a model-version upgrade"
  ]
},
{
  "question": "You are a platform architect designing an internal Claude-based assistant that serves both finance analysts and external auditors. Each population must access only documents permitted by its role. Where should role-based access control be enforced in the pipeline?",
  "options": [
    "Inside the system prompt as a natural-language instruction for Claude to ignore unauthorized documents.",
    "At the retrieval layer, before any role-restricted content reaches the prompt-construction step or the model.",
    "Nowhere in the pipeline; rely on the model's general refusal behavior to reject unauthorized document access without any enforced access control.",
    "After the response is generated, by post-filtering content that should not have been retrieved."
  ],
  "answers": ["At the retrieval layer, before any role-restricted content reaches the prompt-construction step or the model."]
},
{
  "question": "You are designing a content moderation classifier that processes high volumes of usergenerated comments under a tight per-message latency budget using well-defined classification labels. Which model selection best aligns with the workload?",
  "options": [
    "Opus, because every moderation decision requires maximum reasoning depth regardless of classification complexity.",
    "Haiku, because its latency and cost profile align with high-volume classification workloads that require limited reasoning depth.",
    "Sonnet, because larger general-purpose models are preferred even when workload latency requirements are strict.",
    "Sonnet with extended thinking enabled, because deeper reasoning should be applied to every moderation request to improve edge-case handling."
  ],
  "answers": ["Haiku, because its latency and cost profile align with high-volume classification workloads that require limited reasoning depth."]
},
{
  "question": "A Claude architect is implementing safety controls for a customer-facing advice assistant that must never provide regulated investment recommendations. Which two guardrail implementations most directly enforce this constraint? (Select two.)",
  "options": [
    "Increase response temperature to introduce variability that reduces the likelihood of specific recommendations.",
    "Add an output classifier that detects and blocks responses containing regulated investmentrecommendation language.",
    "Limit session length to reduce the volume of queries processed per user per day.",
    "Log all user queries to a SIEM for post-hoc compliance review.",
    "Define explicit out-of-scope categories in the system prompt with fixed refusal phrasing for investment advice requests."
  ],
  "answers": [
    "Add an output classifier that detects and blocks responses containing regulated investmentrecommendation language.",
    "Define explicit out-of-scope categories in the system prompt with fixed refusal phrasing for investment advice requests."
  ]
},
{
  "question": "You are responding to a stakeholder request that adds significant scope to a deployment already in flight. Which response best aligns expectations while respecting the stakeholder's underlying need?",
  "options": [
    "Hide the scope-addition request from the broader delivery team to avoid a difficult conversation, allowing the change to proceed without team awareness of its timeline implications.",
    "Decline the request outright without acknowledging the stakeholder's underlying need or offering alternatives such as deferral, descoping, or timeline extension.",
    "Acknowledge the request, describe the scope and timeline implications transparently, and propose options-defer it, descope something else, or extend the timeline-for the stakeholder to choose.",
    "Accept the additional scope into the current release without describing the timeline or descoping implications, allowing the delivery plan to absorb unacknowledged changes until they surface as delays."
  ],
  "answers": ["Acknowledge the request, describe the scope and timeline implications transparently, and propose options-defer it, descope something else, or extend the timeline-for the stakeholder to choose."]
},
{
  "question": "You are assessing data-exfiltration risk in a Claude-based assistant that has tools for both internal-document retrieval and outbound HTTP calls. Which scenario most directly indicates a data-exfiltration risk?",
  "options": [
    "The outbound HTTP tool returns a 200 response when the assistant calls an allow-listed domain to fulfil a user-initiated data-lookup request.",
    "The user submits a routine question and receives a routine answer.",
    "Adversarial content in a retrieved document instructs the model to call the outbound HTTP tool and send sensitive content to an attacker-controlled URL.",
    "The internal-document retrieval tool returns a document that the user is authorized to view."
  ],
  "answers": ["Adversarial content in a retrieved document instructs the model to call the outbound HTTP tool and send sensitive content to an attacker-controlled URL."]
},
{
  "question": "You are building an ethics-review checklist for deployments supported by artificial intelligence. Which two checks belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Confirm that vendor licensing terms permit the planned production use of the model.",
    "Verify that outputs do not rely on generalizations about people that the underlying data does not support.",
    "Confirm that high-impact decisions retain human accountability rather than being attributed to the model.",
    "Restrict ethics review to outputs that exceed a defined model-confidence threshold.",
    "Confirm that latency and throughput targets are met across supported user populations."
  ],
  "answers": [
    "Verify that outputs do not rely on generalizations about people that the underlying data does not support.",
    "Confirm that high-impact decisions retain human accountability rather than being attributed to the model."
  ]
},
{
  "question": "You are listing characteristics of robust guardrail design for an enterprise deployment. Which two characteristics belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Centralized log retention for guardrail violations with quarterly review by the security team.",
    "Per-role tool allow-lists enforced at the orchestration layer before any tool call executes.",
    "User feedback channels that route reported guardrail failures into the product backlog for triage.",
    "Periodic refresh of the system prompt wording to keep refusal language current and clear.",
    "Adversarial-input coverage in the evaluation set with regression tracking on guardrail performance."
  ],
  "answers": [
    "Per-role tool allow-lists enforced at the orchestration layer before any tool call executes.",
    "Adversarial-input coverage in the evaluation set with regression tracking on guardrail performance."
  ]
},
{
  "question": "You are integrating human review into a high-volume classification pipeline where reviewing every output is infeasible. Which sampling strategy best balances throughput with quality oversight?",
  "options": [
    "No sampling, relying entirely on user complaints to reveal quality and safety problems after they affect users.",
    "Risk-stratified sampling that reviews all low-confidence and high-impact outputs and a smaller random sample of high-confidence routine outputs.",
    "Inverse sampling that reviews only high-confidence routine outputs and skips low-confidence and high-impact outputs.",
    "Universal review of every output regardless of confidence or throughput impact."
  ],
  "answers": ["Risk-stratified sampling that reviews all low-confidence and high-impact outputs and a smaller random sample of high-confidence routine outputs."]
},
{
  "question": "A business sponsor has requested an AI solution to \"improve customer experience.\" The sponsor cannot articulate which customer journey is failing, which metric reflects the failure, or which decisions the AI should support. The sponsor is asking you to begin design work next week. Which delegation-competency action should you take first?",
  "options": [
    "Recommend that the sponsor revise the request and resubmit it later for evaluation.",
    "Begin prototyping a generic assistant against the broad request before the next deadline.",
    "Propose a fixed scope that you commit to by default based on your own assumptions.",
    "Facilitate a structured discovery to define the failing decision and the target metric."
  ],
  "answers": ["Facilitate a structured discovery to define the failing decision and the target metric."]
},
{
  "question": "A loan pre-qualification assistant shows 94 percent approval recommendations that match the human underwriter decision. The fairness team has reviewed approval rate parity across protected groups and reported no significant difference. A board member has asked whether this evidence is sufficient to declare the assistant fair. Which two Discernment-competency findings should you report? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Approval rate parity does not by itself assess error rate parity across protected groups.",
    "Match with human underwriters does not establish freedom from underwriter-introduced bias.",
    "The 94 percent match rate is sufficient evidence of fairness for the assistant's decisions.",
    "The fairness team's review process likely missed at least some of the protected groups studied.",
    "A larger sample is needed before any meaningful fairness claim can be made about the model."
  ],
  "answers": [
    "Approval rate parity does not by itself assess error rate parity across protected groups.",
    "Match with human underwriters does not establish freedom from underwriter-introduced bias."
  ]
},
{
  "question": "You are operating an interactive assistant whose dominant performance constraint is perturn latency. Quality on routine turns is already acceptable. Which configuration adjustment most directly improves latency without disproportionately damaging quality?",
  "options": [
    "Disable prompt caching entirely to ensure fresh context processing on every request, preventing stale prefix content from affecting latency-sensitive interactions.",
    "Reduce retrieval depth to the top-k passages that historically cover the answer, and cache stable system-prompt content.",
    "Increase retrieval depth to the corpus maximum to improve recall regardless of latency.",
    "Switch every turn to the heaviest available model to maximize output quality, accepting that the increased model latency will worsen the per-turn SLO rather than improve it."
  ],
  "answers": ["Reduce retrieval depth to the top-k passages that historically cover the answer, and cache stable system-prompt content."]
},
{
  "question": "You are building a feedback-and-alignment routine for a multi-stakeholder deployment. Which two practices belong in the routine? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Record each session and distribute the recording to stakeholders who could not attend live.",
    "Escalate any disagreement among stakeholders to the executive sponsor for binding resolution.",
    "Rotate facilitation among the participating stakeholder groups to share ownership of the routine.",
    "Set a regular cadence for revisiting expectations and assumptions as conditions evolve over time.",
    "Reconcile divergent stakeholder positions explicitly rather than papering over them in the moment."
  ],
  "answers": [
    "Set a regular cadence for revisiting expectations and assumptions as conditions evolve over time.",
    "Reconcile divergent stakeholder positions explicitly rather than papering over them in the moment."
  ]
},
{
  "question": "An architect is reviewing a set of architecture documentation packages before handing off a Claude-based pipeline to an implementation team. Which two characteristics indicate that a documentation package is sufficient to support implementation without ongoing architect involvement? (Select two.)",
  "options": [
    "The document specifies integration contracts, configuration schemas, and expected input/output shapes for each component.",
    "The document includes a decision log that records the rationale for key architectural choices and the alternatives rejected.",
    "The document provides a high-level narrative description of the business problem without component-level detail.",
    "The document includes the architect's contact information for questions arising during implementation.",
    "The document lists all Claude models that were evaluated but does not specify which was selected or why."
  ],
  "answers": [
    "The document specifies integration contracts, configuration schemas, and expected input/output shapes for each component.",
    "The document includes a decision log that records the rationale for key architectural choices and the alternatives rejected."
  ]
},
{
  "question": "You are reviewing a peer's draft system prompt that contains contradictory instructions: one section says never to speculate beyond the supplied source, while another says to confidently fill in any gaps. Which response is most appropriate?",
  "options": [
    "Add a priority instruction directing the model to evaluate all instructions and apply whichever appears most contextually appropriate on each request.",
    "Remove or rewrite the gap-filling instruction so the prompt consistently constrains the model to source-supported content.",
    "Increase temperature so output randomness masks the contradiction.",
    "Keep both instructions and rely on the model to decide which one to follow on each request."
  ],
  "answers": ["Remove or rewrite the gap-filling instruction so the prompt consistently constrains the model to source-supported content."]
},
{
  "question": "You are comparing patterns for a batch document-classification job that follows fixed steps: extract metadata, classify, summarize, and persist. Which pattern is the best fit and why?",
  "options": [
    "A workflow pattern, because agentic patterns do not support tool invocations and therefore cannot execute the persist step that writes results to the downstream store.",
    "An agentic pattern, because the open-ended planning capability of agents produces more consistent structured outputs than a fixed workflow graph on classification tasks.",
    "An agentic pattern, because agents are categorically more accurate than workflows and therefore always preferable regardless of step predictability.",
    "A workflow pattern, because the steps are well-defined and predictable per-request token cost is preferred over flexibility."
  ],
  "answers": ["A workflow pattern, because the steps are well-defined and predictable per-request token cost is preferred over flexibility."]
},
{
  "question": "A managed agent deployment for claims triage has grown from 6 tools to 34 tools over 18 months as product teams added capabilities. Triage accuracy has declined from 91 percent to 78 percent, and average tool-selection latency has increased by 2.3 seconds. A junior engineer has proposed adding a tool-router agent in front of the current agent to filter the tool list per request. Which two findings should you present to justify capability decomposition before adding the router? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Tool descriptions overlap across multiple claim categories within the agent's tool set.",
    "Several tools have not been invoked across the most recent 90 days of traffic.",
    "The 34 tools serve four distinct claim-workflow domains within the triage scope.",
    "The router pattern is well documented across publicly available agent literature.",
    "The proposed router introduces an additional model call on every incoming request."
  ],
  "answers": [
    "The 34 tools serve four distinct claim-workflow domains within the triage scope.",
    "The proposed router introduces an additional model call on every incoming request."
  ]
},
{
  "question": "A Claude architect needs to ensure that a security-hardening flag cannot be disabled by any individual engineer after it is set. Which configuration scope correctly enforces this requirement?",
  "options": [
    "User scope (~/.claude/settings.json) on each engineer's machine",
    "Environment variable defined in the CI/CD pipeline only",
    "Managed configuration applied centrally and marked as non-overridable",
    "Project scope (.claude/settings.json) committed to the repository"
  ],
  "answers": ["Managed configuration applied centrally and marked as non-overridable"]
},
{
  "question": "A Claude architect is auditing configuration scope assignments. Which two statements correctly identify an appropriate use of user-scope configuration versus other scopes? (Select two.)",
  "options": [
    "Persisting personal editor theme preferences that follow an engineer across projects.",
    "Saving a preferred Claude response language that applies to all repositories the engineer uses.",
    "Enforcing a company-wide policy that disables a feature for all engineers.",
    "Defining MCP server endpoints shared by all contributors to a specific repository.",
    "Storing API authentication keys so they are not committed to version control."
  ],
  "answers": [
    "Persisting personal editor theme preferences that follow an engineer across projects.",
    "Saving a preferred Claude response language that applies to all repositories the engineer uses."
  ]
},
{
  "question": "You are compiling factors that should drive the choice between Model Context Protocol (MCP), direct API integration, and agent-to-agent handoff. Which two factors belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Whether the vendor publishes detailed reference documentation for each candidate protocol.",
    "Whether the team has prior implementation experience with any of the candidate protocols.",
    "Whether the underlying transport supports encryption in transit between the integrated services.",
    "Whether the integration must be portable across multiple AI clients in the ecosystem.",
    "Whether the interaction is stateless and latency-sensitive or stateful and longer-running."
  ],
  "answers": [
    "Whether the integration must be portable across multiple AI clients in the ecosystem.",
    "Whether the interaction is stateless and latency-sensitive or stateful and longer-running."
  ]
},
{
  "question": "You are selecting a protocol for a single low-latency stateless tool call from a Claude-based assistant to an internal pricing service that already exposes a stable HTTP API. Which integration mechanism is the most appropriate?",
  "options": [
    "A direct API call to the existing endpoint with the appropriate scoped credentials.",
    "A long-lived stateful session protocol for a stateless single-call interaction.",
    "A bespoke streaming protocol layered over an unrelated asynchronous message bus.",
    "An agent-to-agent handoff that introduces another Claude-based agent in front of the pricing service."
  ],
  "answers": ["A direct API call to the existing endpoint with the appropriate scoped credentials."]
},
{
  "question": "A Claude architect observes that after a recent model-version upgrade, grounded responses began including claims not supported by the retrieved source documents. Which mitigation is most directly targeted at this failure mode?",
  "options": [
    "Constrain responses to source-supported content, require citations, and add a verification step.",
    "Score each new model version against a stable adversarial evaluation set.",
    "Replace the shared API key with per-user OAuth tokens to restrict data access.",
    "Treat retrieved data as untrusted and apply input classifiers at ingestion time."
  ],
  "answers": ["Constrain responses to source-supported content, require citations, and add a verification step."]
},
{
  "question": "You are defining escalation criteria for ambiguous cases in an automated workflow. Which set of criteria best supports consistent escalation?",
  "options": [
    "No escalation criteria; the model decides independently on every turn whether to escalate, without explicit confidence thresholds, impact categories, or classifier-based ambiguity flags.",
    "Escalation only after an affected customer has contacted support to complain, after the automated workflow has already completed without human review.",
    "Escalation at the discretion of whoever is available when the team's on-call engineer has spare capacity, without a defined threshold, category, or ambiguity criterion.",
    "A confidence score below a defined threshold, presence of high-impact decision categories, ambiguity flags raised by content classifiers, and the user's explicit request for review."
  ],
  "answers": ["A confidence score below a defined threshold, presence of high-impact decision categories, ambiguity flags raised by content classifiers, and the user's explicit request for review."]
},
{
  "question": "After a prompt-template update, several previously passing test cases now produce unexpected outputs. Which test type is specifically designed to detect this category of failure?",
  "options": [
    "Integration tests that validate cross-component pipeline behavior.",
    "Adversarial tests that probe for prompt-injection vulnerabilities.",
    "Regression tests scored against a stable reference set of known-good behavior.",
    "Smoke tests that confirm high-level system availability after the change."
  ],
  "answers": ["Regression tests scored against a stable reference set of known-good behavior."]
},
{
  "question": "A Claude architect at a health services organization is defining evaluation metrics for a clinical-summary pipeline. The pipeline must remain within a per-query cost ceiling and must never surface patient data to unauthorized roles. Which two metrics directly address these requirements? (Select two.)",
  "options": [
    "BLEU score computed against a human-annotated reference summary set",
    "Role-based access-control enforcement rate measured on a red-team dataset",
    "Throughput measured as successful requests processed per minute",
    "Per-query token cost measured against the defined cost ceiling",
    "Response latency at the 95th percentile across a one-week sample window"
  ],
  "answers": [
    "Role-based access-control enforcement rate measured on a red-team dataset",
    "Per-query token cost measured against the defined cost ceiling"
  ]
},
{
  "question": "You are choosing the level of detail for an implementation guide. The audience is a delivery team that will build the deployment. Which guidance composition best serves them?",
  "options": [
    "Component responsibilities, contracts between components, sequence diagrams of the dominant flows, configuration parameters with defaults, and operational runbooks.",
    "Component responsibilities and interface contracts only, without sequence diagrams of the dominant flows, configuration parameters with defaults, or runbooks to guide operational tasks.",
    "An architecture overview and sequence diagrams for the dominant flows, without interface contracts, configuration-parameter tables, or operational runbooks for the delivery team to follow.",
    "An architecture overview and a list of known limitations, without component-level diagrams, interface contracts, configuration parameters, or operational runbooks to support implementation."
  ],
  "answers": ["Component responsibilities, contracts between components, sequence diagrams of the dominant flows, configuration parameters with defaults, and operational runbooks."]
},
{
  "question": "You are identifying the highest-impact optimization for a deployment whose token cost is dominated by a long, repeated system prompt and a large retrieved context per request. Which optimization most directly targets the dominant cost driver?",
  "options": [
    "Increase retrieval depth on every request to maximize recall, worsening the dominant cost driver by adding more retrieved tokens per request rather than reducing them.",
    "Add additional repeated content to the system prompt to give the model more guidance.",
    "Move the long, repeated system prompt into a cacheable prefix and trim retrieved context to the spans relevant to each query.",
    "Switch every request to the heaviest available model to maximize output quality, accepting that higher per-request inference cost compounds rather than addresses the dominant cost driver."
  ],
  "answers": ["Move the long, repeated system prompt into a cacheable prefix and trim retrieved context to the spans relevant to each query."]
},
{
  "question": "You are defining transparency practices for a customer-facing assistant whose responses are materially shaped by AI. Which transparency practice most directly supports responsible deployment?",
  "options": [
    "Misrepresent the AI's role in producing responses in order to make the assistant feel more trustworthy or more human, undermining informed user consent and organizational transparency.",
    "Refuse to answer any user question about how the responses were produced or whether AI was involved, treating the AI's role as confidential operational information.",
    "Disclose AI involvement to end users in line with the organization's transparency policy and provide a documented path to reach a human when needed.",
    "Disclose AI involvement only to internal staff and operators while withholding that information from the end users whose interactions are materially shaped by the AI system."
  ],
  "answers": ["Disclose AI involvement to end users in line with the organization's transparency policy and provide a documented path to reach a human when needed."]
},
{
  "question": "An engineering organization is adopting Claude Code across 200 developers. A team lead proposes that AI-generated pull requests bypass standard code review for changes under 50 lines because small changes are considered low risk and review capacity is constrained. Which two Diligence-competency objections should you raise? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Removing review eliminates the verification mechanism required for AI-generated output across the workflow.",
    "Code-review capacity should be expanded to handle every code change submitted across the team.",
    "The threshold should be increased to 200 lines to capture more changes.",
    "AI-generated pull requests should be rejected by default across the organization.",
    "Line count is a poor proxy for the actual risk introduced by a code change."
  ],
  "answers": [
    "Removing review eliminates the verification mechanism required for AI-generated output across the workflow.",
    "Line count is a poor proxy for the actual risk introduced by a code change."
  ]
},
{
  "question": "You are defining an SLA for a Claude-based assistant. Which SLA definition is most operationally meaningful?",
  "options": [
    "A target tied to a stakeholder sentiment measure such as the team feels satisfied,which cannot be measured objectively or used to trigger a documented breach response.",
    "A measurable target with a defined metric, threshold, evaluation window, and consequence for breach- for example, p95 per-request latency under 800 ms over a 28-day window.",
    "A qualitative commitment such as \"the system will be fast and reliable,\" which names no metric, threshold, or evaluation window.",
    "A target that names the metric and threshold but omits the evaluation window and breach consequence, leaving compliance periods and remediation triggers undefined."
  ],
  "answers": ["A measurable target with a defined metric, threshold, evaluation window, and consequence for breach- for example, p95 per-request latency under 800 ms over a 28-day window."]
},
// 80
{
  "question": "A Claude architect is designing a HIPAA-compliant pipeline that processes patient records. Which two design decisions directly support HIPAA compliance requirements? (Select two.)",
  "options": [
    "Setting max_tokens to a low value to minimize the volume of text generated per request.",
    "Selecting the highest-capability Claude model to maximize diagnostic accuracy.",
    "Enforcing role-based access controls so that PHI is retrievable only by authorized personnel.",
    "Ensuring patient data is never included in training feedback loops sent to the model provider without a BAA in place.",
    "Using streaming responses to reduce perceived latency for clinical users."
  ],
  "answers": [
    "Enforcing role-based access controls so that PHI is retrievable only by authorized personnel.",
    "Ensuring patient data is never included in training feedback loops sent to the model provider without a BAA in place."
  ]
},
{
  "question": "You are designing a human-in-the-loop validation workflow for a new Claude-based deployment and must complete the design steps before piloting the workflow. Which two steps must be completed BEFORE piloting the workflow with a representative subset of traffic? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Define the sampling strategy and the escalation criteria at each oversight point in the pipeline.",
    "Iterate the workflow design based on observed pilot findings before broader rollout to production.",
    "Onboard the reviewer pool with role-specific training on the check criteria and escalation procedures.",
    "Document the workflow with check criteria, escalation paths, and service-level agreements (SLAs) for each step.",
    "Identify the decision points in the pipeline that require human oversight by impact and reversibility."
  ],
  "answers": [
    "Define the sampling strategy and the escalation criteria at each oversight point in the pipeline.",
    "Identify the decision points in the pipeline that require human oversight by impact and reversibility."
  ]
},
{
  "question": "You are compiling team-setup practices for a Claude Code rollout across an engineering organization. Which two practices belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Use project scope for team-shared Model Context Protocol (MCP) servers and permission rules under version control.",
    "Apply managed configuration centrally for security-critical settings that must not be overridden by individual engineers.",
    "Use local scope for security-critical permission rules so each engineer can adapt them to ongoing work.",
    "Use user scope for team-shared MCP servers so every engineer on the team has consistent access.",
    "Use project scope for personal editor preferences so the preferences apply consistently within the project."
  ],
  "answers": [
    "Use project scope for team-shared Model Context Protocol (MCP) servers and permission rules under version control.",
    "Apply managed configuration centrally for security-critical settings that must not be overridden by individual engineers."
  ]
},
{
  "question": "You are reviewing a customer-support agent's configuration. Each candidate tool falls into one of four categories: (1) required to complete defined tasks, (2) frequently used and reduces handoffs, (3) occasionally useful for unrelated work, (4) speculative future utility. Which categories should typically remain in the agent configuration?",
  "options": [
    "Only category 3, because occasionally useful tools for unrelated work provide broader coverage and should take priority over tools required for the agent's defined tasks.",
    "Only category 4, because speculative future-utility tools provide the most flexibility and should be configured even when no defined task currently requires them.",
    "Categories 1 and 2 only, because they map to defined tasks and the agent's regular hand-offs.",
    "All four categories, because broader tool access is categorically better for agent performance regardless of whether the tools map to defined tasks or regular hand-offs."
  ],
  "answers": ["Categories 1 and 2 only, because they map to defined tasks and the agent's regular hand-offs."]
},
{
  "question": "You are documenting an architectural decision to support future audit and onboarding. Which artifact is the strongest fit?",
  "options": [
    "A slide deck in a presentation folder with no accompanying written rationale.",
    "A code comment in a single file that contains an opinion of one engineer.",
    "An Architecture Decision Record that states the context, the decision, the alternatives considered, the consequences, and the date and authors.",
    "A short verbal note shared during a hallway conversation with no written record."
  ],
  "answers": ["An Architecture Decision Record that states the context, the decision, the alternatives considered, the consequences, and the date and authors."]
},
{
  "question": "During an architectural review, the security team identifies a risk that adversarial content injected into retrieved documents could manipulate the model's behavior. Which mitigation most directly addresses this threat?",
  "options": [
    "Treat all retrieved content as untrusted input and apply input classifiers with output validation.",
    "Require citations for each claim and constrain responses to source-supported content.",
    "Restrict outbound tool calls to an approved destination allow-list.",
    "Score outputs against a stable adversarial evaluation set on each model-version change."
  ],
  "answers": ["Treat all retrieved content as untrusted input and apply input classifiers with output validation."]
},
{
  "question": "You are evaluating an evaluation set used to score a Claude-based hiring-support tool. The set is drawn from one geographic region and one tenure band. Which response is most appropriate?",
  "options": [
    "Discard all quantitative evaluation and replace it with qualitative impressions collected from a small, convenience-selected group that may not represent the tool's full user population.",
    "Expand the evaluation set to cover the geographic regions and tenure bands the tool will serve, and rescore the system on the expanded set before broader release.",
    "Reduce the evaluation set further to a single demographic subgroup to simplify score interpretation, narrowing coverage rather than expanding it to match the intended user population.",
    "Continue using the narrow evaluation set drawn from one region and one tenure band because the existing benchmark scores are already high on that subset."
  ],
  "answers": ["Expand the evaluation set to cover the geographic regions and tenure bands the tool will serve, and rescore the system on the expanded set before broader release."]
},
{
  "question": "You must present an architectural recommendation to deploy a Claude-based contract review assistant to a steering committee that includes the CFO, the general counsel, and the CIO. Each stakeholder cares about different aspects of the decision. How should you structure the recommendation document?",
  "options": [
    "Lead with the technical architecture diagram and the full component list before any other section.",
    "Lead with detailed cost projections across the full multi-year horizon before the rationale section.",
    "Present the same dense narrative throughout with no stakeholder differentiation in any section.",
    "Lead with the architectural decision, then address each stakeholder's primary concerns directly."
  ],
  "answers": ["Lead with the architectural decision, then address each stakeholder's primary concerns directly."]
},
{
  "question": "You are compiling a diagnostic toolkit for Claude Code operational issues. Which two diagnostic actions belong in the toolkit? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Increase the model sampling temperature so that intermittent issues surface more frequently for analysis.",
    "File a support ticket with vendor support before any local reproduction or evidence collection.",
    "Reproduce the issue with a minimal reproduction case that isolates one variable at a time.",
    "Roll back to the previous Claude Code version immediately to confirm whether the issue is version specific.",
    "List the configured Model Context Protocol (MCP) servers and inspect server status to identify connection failures."
  ],
  "answers": [
    "Reproduce the issue with a minimal reproduction case that isolates one variable at a time.",
    "List the configured Model Context Protocol (MCP) servers and inspect server status to identify connection failures."
  ]
},
{
  "question": "A Claude Architect is reviewing a post-deployment performance report for an AI-assisted legal-document summarization system. The report includes these observations: * Average summarization time decreased from 47 minutes to 6 minutes per document. * Associates spend less time on summaries, but overall billable output has not measurably changed. * Infrastructure costs increased by 22% because redundant retry logic generated additional API calls. * Some summaries require attorney correction, adding an average of 8 minutes of review per document. Which analysis correctly attributes each observation to the appropriate business-value pillar?",
  "options": [
    "Observations 1 and 2 both indicate efficiency gains; Observation 3 is a solution-cost issue; Observation 4 is a performance-SLA issue.",
    "Observation 1 is a transformation outcome; Observation 2 is an efficiency gain; Observation 3 is a performance-SLA degradation; Observation 4 is a solution-cost issue.",
    "Observations 1 and 4 together indicate a net performance-SLA improvement; Observation 2 is a transformation gap; Observation 3 is a productivity drain from over-engineering.",
    "Observation 1 indicates an efficiency gain; Observation 2 shows that productivity has not yet been realized; Observation 3 is a solution-cost issue; Observation 4 is an efficiency loss that partially offsets Observation 1."
  ],
  "answers": ["Observation 1 indicates an efficiency gain; Observation 2 shows that productivity has not yet been realized; Observation 3 is a solution-cost issue; Observation 4 is an efficiency loss that partially offsets Observation 1."]
},
{
  "question": "You are supporting an engineer whose newly added MCP server does not appear in their Claude Code session. Which diagnostic step should be tried first?",
  "options": [
    "Disable every MCP server in the configuration to isolate the issue, removing all tool access rather than confirming whether the new server is registered.",
    "Switch the team to a different Claude product family unrelated to the existing workflow, abandoning the current configuration rather than diagnosing the registration issue.",
    "Verify the MCP server is registered using the listing command, then reconnect the session if needed, since configuration changes typically require a restart to take effect.",
    "Reinstall the developer's operating system from scratch, discarding all local configuration and tool state before attempting any targeted diagnostic steps."
  ],
  "answers": ["Verify the MCP server is registered using the listing command, then reconnect the session if needed, since configuration changes typically require a restart to take effect."]
},
{
  "question": "You are a solution architect designing a Claude-based assistant with access to 60 internal tools across multiple business domains. Loading every tool definition on every request increases token usage and time to first response. Which design pattern best addresses this issue without sacrificing capability breadth?",
  "options": [
    "Apply progressive tool discovery so a curated initial subset is exposed and additional tools are loaded on demand based on the task.",
    "Use a separate model call to summarize all 60 tool definitions before each user turn.",
    "Increase the maximum context length and load all 60 tool definitions on every request, accepting the higher token cost and latency as necessary for full capability.",
    "Hard-code a fixed set of five tools per request to reduce token usage, regardless of whether those tools are relevant to the current task."
  ],
  "answers": ["Apply progressive tool discovery so a curated initial subset is exposed and additional tools are loaded on demand based on the task."]
},
{
  "question": "The compliance team at a firm has approved a Claude Skill that generates client-facing investment summaries. The Skill includes the firm's required disclaimers and prohibited-language list. A product manager has asked whether additional guardrails are needed at the application layer or whether the Skill alone is sufficient. Which two guardrail responsibilities should remain at the application layer rather than the Skill? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Log every generated summary to the firm's compliance audit trail for retention.",
    "Verify the requesting user is authorized to generate investment summaries at all.",
    "Format output sections according to the firm's standardized house style guidelines.",
    "Apply the disclaimer template that the compliance team has standardized firm-wide.",
    "Apply the prohibited-language list that the compliance team maintains and updates."
  ],
  "answers": [
    "Log every generated summary to the firm's compliance audit trail for retention.",
    "Verify the requesting user is authorized to generate investment summaries at all."
  ]
},
{
  "question": "You are supporting an EU-based deployment with GDPR obligations. Which combination of measures best supports the deployment's GDPR posture?",
  "options": [
    "enterprise-tier deployment with a signed Data Processing Addendum, defined data-retention configuration, redaction of personal data not needed for the task, and documented data-subjectrights handling",
    "disabling all data-retention configuration, redaction controls, and data-subject-rights handling to simplify day-to-day operations, accepting the resulting GDPR compliance exposure",
    "using a personal Claude account tier for processing EU personal data at scale, with no signed Data Processing Addendum and no documented data-subject-rights handling procedure",
    "pasting full EU personal data into every prompt to \"give Claude complete context\" without considering purpose limitation, data minimization, or the organization's Data Processing Addendum obligations"
  ],
  "answers": ["enterprise-tier deployment with a signed Data Processing Addendum, defined data-retention configuration, redaction of personal data not needed for the task, and documented data-subjectrights handling"]
},
{
  "question": "You are reviewing instrumentation in a multi-agent system. Which two findings constitute valid observability gaps in the instrumentation? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Trace spans for each agent step are exported to the shared distributed-tracing backend.",
    "Latency and token usage on every span are emitted to the central metrics pipeline.",
    "Tool-call payloads and outcomes are recorded with redaction applied to known sensitive fields.",
    "Model identity and version on each turn are not recorded with the turn artifacts.",
    "Request-scoped correlation identifiers do not propagate across agent and tool calls."
  ],
  "answers": [
    "Model identity and version on each turn are not recorded with the turn artifacts.",
    "Request-scoped correlation identifiers do not propagate across agent and tool calls."
  ]
},
{
  "question": "When communicating an architectural decision to a security and compliance reviewer, which content set is most aligned with that audience's primary concerns?",
  "options": [
    "Feature delivery schedule, roadmap dependencies, and scope boundaries for the product manager.",
    "Implementation timeline, component interfaces, and deployment sequence for the engineering team.",
    "Threat model, control mappings, residual-risk acceptance criteria, and audit traceability.",
    "Decision rationale, business outcomes, and high-level risk summary for executive review."
  ],
  "answers": ["Threat model, control mappings, residual-risk acceptance criteria, and audit traceability."]
},
{
  "question": "You are defining when to introduce a project subagent versus relying on Claude Code's general capabilities. Which scenario most directly justifies a dedicated subagent?",
  "options": [
    "The team has a recurring specialized task, such as database schema review, that requires a focused system prompt, narrow tool permissions, and a specific model selection across many sessions.",
    "The team has a one-time ad hoc question that will not recur and does not require a focused system prompt, narrow tool permissions, or dedicated model selection.",
    "The team has no recurring specialized tasks and uses Claude Code only for isolated generalpurpose work that does not justify a dedicated system prompt or tool scope.",
    "The team wants every Claude Code interaction to use the same generic system prompt with no task- specific specialization, narrow tool permissions, or dedicated model selection."
  ],
  "answers": ["The team has a recurring specialized task, such as database schema review, that requires a focused system prompt, narrow tool permissions, and a specific model selection across many sessions."]
},
{
  "question": "You are identifying signals that a deployment should re-enter design rather than continue iterating in place. Which signal most directly indicates the need for a new design cycle?",
  "options": [
    "A minor copy edit is requested in a customer-facing string within the existing UI, which can be handled as a localized content change without altering component responsibilities or contracts.",
    "A dashboard alert threshold needs a small numerical adjustment to reduce false-positive noise, which can be handled as an operational configuration change without a new design cycle.",
    "A runbook step requires a clarification edit to improve on-call guidance accuracy, which can be handled as a documentation update without changes to component responsibilities or core contracts.",
    "The system's current architecture cannot meet the new requirements without changes to component responsibilities or core contracts."
  ],
  "answers": ["The system's current architecture cannot meet the new requirements without changes to component responsibilities or core contracts."]
},
{
  "question": "You are rolling out monitoring for a Claude-based deployment and must complete the specification steps before instrumenting the deployment. Which two steps must be completed BEFORE instrumenting the deployment to emit metrics and traces? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Define the metrics and the slices the deployment will monitor across normal and adversarial traffic.",
    "Tune the alert thresholds based on observed normal-state distributions to reduce false positives.",
    "Define the service-level objectives (SLOs) and the error budgets the deployment will be held to.",
    "Build the dashboards that surface metrics across slices at the cadence the team operates on.",
    "Document the dashboards, alerts, and runbooks for the on-call rotation that will respond."
  ],
  "answers": [
    "Define the metrics and the slices the deployment will monitor across normal and adversarial traffic.",
    "Define the service-level objectives (SLOs) and the error budgets the deployment will be held to."
  ]
},
{
  "question": "You are integrating Claude Code into a team workflow and must complete the design and configuration steps before piloting the integrated workflow with a small group. Which two steps must be completed BEFORE piloting the integrated workflow? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Document the integrated workflow with handoff criteria, permission boundaries, and on-call runbooks.",
    "Identify the workflow steps where AI-assisted tooling adds value and where human authority must remain.",
    "Negotiate the workflow change with affected teams and obtain formal sign-off from each manager.",
    "Iterate the integrated workflow based on pilot findings before broader rollout to the team.",
    "Configure the project-scope MCP servers, permissions, subagents, and persistent project context."
  ],
  "answers": [
    "Identify the workflow steps where AI-assisted tooling adds value and where human authority must remain.",
    "Configure the project-scope MCP servers, permissions, subagents, and persistent project context."
  ]
},
{
  "question": "You are preparing a HIPAA-eligible deployment for a healthcare customer. Which configuration supports HIPAA compliance using Anthropic-offered tools?",
  "options": [
    "Claude Free with no contractual addendum, since consumer products meet HIPAA requirements out of the box.",
    "Claude Enterprise with a signed Business Associate Agreement, Zero Data Retention enabled, and audit logging configured for compliance tracking.",
    "Disabling all audit logging so that no PHI is recorded in any log store, on the assumption that the absence of logs satisfies HIPAA requirements without a signed BAA.",
    "An ad-hoc personal Claude account used by individual clinicians for PHI-related tasks, with no Business Associate Agreement, no Zero Data Retention, and no audit logging configured."
  ],
  "answers": ["Claude Enterprise with a signed Business Associate Agreement, Zero Data Retention enabled, and audit logging configured for compliance tracking."]
},
{
  "question": "You are listing characteristics of strong architectural-decision communication. Which two characteristics belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Ownership and review cadence for revisiting the decision when conditions or assumptions change.",
    "Distribution to a standing review forum with mandatory attendance from senior engineering leaders.",
    "Omission of rejected alternatives to keep the decision document focused and concise for readers.",
    "Alternatives considered along with the criteria that were used to evaluate each alternative.",
    "Use of a consistent template across the team to standardize the visual presentation of decisions."
  ],
  "answers": [
    "Ownership and review cadence for revisiting the decision when conditions or assumptions change.",
    "Alternatives considered along with the criteria that were used to evaluate each alternative."
  ]
},
{
  "question": "You are integrating Claude Code into a workflow that runs against a production database. Which guardrail design most directly preserves safety on data-modifying operations?",
  "options": [
    "Allow Claude Code to write directly to the production database without subagent scoping, readonly credential defaults, or human confirmation gates on data-modifying operations.",
    "Configure the database MCP server with a fully privileged credential that can perform any read or write operation, and allow all operations to proceed without explicit human confirmation.",
    "Disable all logging and auditing on database operations through the MCP server to reduce alert noise, removing the observability needed to detect unintended data modifications.",
    "Configure the database MCP server with a read-only credential by default, restrict the subagent's tool list to read-only operations, and require explicit human confirmation on any operation that would modify data."
  ],
  "answers": ["Configure the database MCP server with a read-only credential by default, restrict the subagent's tool list to read-only operations, and require explicit human confirmation on any operation that would modify data."]
},
{
  "question": "You are building an evaluation pipeline for a Claude-based deployment and must complete the specification steps before running the deployment against the dataset. Which two steps must be completed BEFORE running the deployment against the evaluation dataset? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Publish the aggregated metrics to a dashboard and gate releases on threshold checks.",
    "Curate and label the evaluation dataset to match the defined slices.",
    "Review failure cases with subject matter experts to refine the scoring rubric.",
    "Define the metrics and slices the framework will report across representative, edge, and adversarial cases.",
    "Score the deployment outputs against the reference labels and aggregate the metrics."
  ],
  "answers": [
    "Curate and label the evaluation dataset to match the defined slices.",
    "Define the metrics and slices the framework will report across representative, edge, and adversarial cases."
  ]
},
{
  "question": "You are identifying signals that a deployment should re-enter design rather than continue iterating in place. Which signal most directly indicates the need for a new design cycle?",
  "options": [
    "A runbook step requires a clarification edit to improve on-call guidance accuracy, which can be handled as a documentation update without changes to component responsibilities or core contracts.",
    "A dashboard alert threshold needs a small numerical adjustment to reduce false-positive noise, which can be handled as an operational configuration change without a new design cycle.",
    "A minor copy edit is requested in a customer-facing string within the existing UI, which can be handled as a localized content change without altering component responsibilities or contracts.",
    "The system's current architecture cannot meet the new requirements without changes to component responsibilities or core contracts."
  ],
  "answers": ["The system's current architecture cannot meet the new requirements without changes to component responsibilities or core contracts."]
},
{
  "question": "You are rolling out a standardized Claude Code configuration to an engineering team and must complete the planning steps before piloting the configuration. Which two steps must be completed BEFORE piloting the configuration with a small group of engineers? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Define the project-scope baseline covering Model Context Protocol (MCP) servers, permission rules, and subagents.",
    "Onboard every engineer in the organization to the new configuration through mandatory training sessions.",
    "Roll out the stabilized configuration to additional teams with documentation and a defined support channel.",
    "Identify the team workflows, security boundaries, and which decisions belong to managed configuration versus project scope.",
    "Iterate the configuration based on the pilot findings and stabilize the baseline before broader rollout."
  ],
  "answers": [
    "Define the project-scope baseline covering Model Context Protocol (MCP) servers, permission rules, and subagents.",
    "Identify the team workflows, security boundaries, and which decisions belong to managed configuration versus project scope."
  ]
},
{
  "question": "A healthcare organization is evaluating two Claude-powered AI architectures for a clinical documentation assistant. Architecture X produces higher output quality scores but costs $0.18 per documentation session and averages 4.2 seconds per response. Architecture Y scores slightly lower on quality metrics but costs $0.09 per session and averages 2.1 seconds per response. The stated SLA requires responses under 3 seconds, and the annual volume is projected at 2 million documentation sessions. Which evaluation approach correctly applies business value pillar analysis to this decision?",
  "options": [
    "Select Architecture Y based solely on the 50% cost reduction, since solution cost is the most important value pillar in healthcare budget-constrained environments.",
    "Select Architecture X because the higher quality scores justify the cost premium, and any SLA gap can be addressed through infrastructure optimization after deployment.",
    "Eliminate Architecture X on SLA grounds, then evaluate Architecture Y against the efficiency and solution cost pillars by calculating annual cost difference and assessing whether the quality delta materially impacts clinical workflow productivity.",
    "Recommend a hybrid approach using Architecture X for complex cases and Architecture Y for routine cases, without additional analysis, since this preserves quality where it matters most."
  ],
  "answers": ["Eliminate Architecture X on SLA grounds, then evaluate Architecture Y against the efficiency and solution cost pillars by calculating annual cost difference and assessing whether the quality delta materially impacts clinical workflow productivity."]
},
{
  "question": "You are a solution architect designing a Claude-based assistant with access to 60 internal tools across multiple business domains. Loading every tool definition on every request increases token usage and time to first response. Which design pattern best addresses this issue without sacrificing capability breadth?",
  "options": [
    "Apply progressive tool discovery so a curated initial subset is exposed and additional tools are loaded on demand based on the task.",
    "Use a separate model call to summarize all 60 tool definitions before each user turn.",
    "Increase the maximum context length and load all 60 tool definitions on every request, accepting the higher token cost and latency as necessary for full capability.",
    "Hard-code a fixed set of five tools per request to reduce token usage, regardless of whether those tools are relevant to the current task."
  ],
  "answers": ["Apply progressive tool discovery so a curated initial subset is exposed and additional tools are loaded on demand based on the task."]
},
{
  "question": "You are listing characteristics of robust guardrail design for an enterprise deployment. Which two characteristics belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Centralized log retention for guardrail violations with quarterly review by the security team.",
    "Periodic refresh of the system prompt wording to keep refusal language current and clear.",
    "User feedback channels that route reported guardrail failures into the product backlog for triage.",
    "Per-role tool allow-lists enforced at the orchestration layer before any tool call executes.",
    "Adversarial-input coverage in the evaluation set with regression tracking on guardrail performance."
  ],
  "answers": [
    "Per-role tool allow-lists enforced at the orchestration layer before any tool call executes.",
    "Adversarial-input coverage in the evaluation set with regression tracking on guardrail performance."
  ]
},
{
  "question": "You are explaining the precedence of Claude Code configuration scopes to the team. Which precedence ordering, from highest to lowest, is correct?",
  "options": [
    "Local > managed > user > command-line arguments > project",
    "Project > user > managed > local > command-line arguments",
    "Managed > command-line arguments > local > project > user",
    "User > project > local > command-line arguments > managed"
  ],
  "answers": ["Managed > command-line arguments > local > project > user"]
},
{
  "question": "A Claude architect is leading the discovery phase for a new AI-powered customer service solution. Which two activities are characteristic of structured discovery and requirement gathering for a Claude-based deployment? (Select two.)",
  "options": [
    "Facilitating stakeholder workshops to surface latency, accuracy, and compliance constraints before scoping begins.",
    "Selecting the Claude model tier based on the architect's prior project experience before stakeholder input is collected.",
    "Generating an initial prototype and iterating based on user reaction rather than written requirements.",
    "Documenting explicit success criteria and failure thresholds that will gate production deployment.",
    "Deferring constraint documentation until the integration design phase to avoid scope creep."
  ],
  "answers": [
    "Facilitating stakeholder workshops to surface latency, accuracy, and compliance constraints before scoping begins.",
    "Documenting explicit success criteria and failure thresholds that will gate production deployment."
  ]
},
{
  "question": "You are classifying token-management tactics by where each tactic applies in the request lifecycle: \"Input Preparation,\" \"Prompt Construction,\" or \"Output Handling.\"",
  "options": [
    "Input Preparation-Prompt Construction-Output Handling-Output Handling-Output Handling-Prompt Construction",
    "Output Handling-Prompt Construction-Input Preparation-Output Handling-Prompt Construction-Input Preparation",
    "Output Handling-Input Preparation-Input Preparation-Output Handling-Prompt Construction-Input Preparation",
    "Prompt ConstructionInput Preparation-Prompt Construction-Output Handling-Prompt Construction-Input Preparation",
  ],
  "answers": [
  "Output Handling-Prompt Construction-Input Preparation-Output Handling-Prompt Construction-Input Preparation",
],
"image": "./CCAR-P/no112.png"

},
{
  "question": "A customer support team has proposed delegating customer refund decisions to a Claude-driven workflow with no human review for refunds under 50 USD. The team's reasoning is that small refunds are low-risk and human review would erase the efficiency gain. Which Delegation-competency principle should guide your response?",
  "options": [
    "Delegation should always include human review on every decision the workflow produces.",
    "Delegation scope should reflect the type of risk involved, not the transaction size alone.",
    "Delegation scope should be set primarily by maximizing efficiency gains across the workflow.",
    "Delegation should be avoided entirely wherever financial transactions occur in the workflow."
  ],
  "answers": ["Delegation scope should reflect the type of risk involved, not the transaction size alone."]
},
{
  "question": "You are identifying inefficiency in a Claude Code workflow where each engineer manually re-explains the project's conventions and architecture in every session. Which adjustment most directly removes this inefficiency?",
  "options": [
    "Forbid the use of Claude Code on the project entirely to avoid the session-initialization overhead, accepting that the team loses all AI-assisted development productivity for this codebase.",
    "Capture the project's conventions and architecture in a project-scoped CLAUDE.md (or equivalent persistent project-context file) committed to the repository, so each session loads it automatically.",
    "Tell each engineer to retype the project conventions and architecture context more quickly at the start of each session, reducing time lost without eliminating the repeated manual effort.",
    "Remove all documented project conventions and architectural standards so engineers have nothing to re-explain at session start, accepting the loss of consistency and shared coding standards."
  ],
  "answers": ["Capture the project's conventions and architecture in a project-scoped CLAUDE.md (or equivalent persistent project-context file) committed to the repository, so each session loads it automatically."]
},
{
  "question": "The compliance team has authored a regulatory disclosure procedure that must be applied identically across customer service, sales, and onboarding workflows. The procedure changes when regulators issue updates, currently four to six times per year. You are designing how the procedure will be packaged for use by Claude across all three workflows. Which two design decisions should you include? (Select two.) Each correct answer presents part of the solution.",
  "options": [
    "Package the procedure as a Claude Skill owned directly by the compliance team.",
    "Embed the procedure text into each workflow's system prompt at integration time.",
    "Store the procedure in a shared retrieval corpus accessed by all three workflows.",
    "Have each workflow team rewrite the procedure for its own context.",
    "Reference the same Claude Skill from all three workflow integrations."
  ],
  "answers": [
    "Package the procedure as a Claude Skill owned directly by the compliance team.",
    "Reference the same Claude Skill from all three workflow integrations."
  ]
},
{
  "question": "You are compiling continuity practices that span the deployment lifecycle. Which two practices belong on the list? (Select two.) Each correct answer presents a complete solution.",
  "options": [
    "Maintain a stakeholder register and notify the listed parties at every phase transition event.",
    "Carry the evaluation framework and reference set forward across iterations rather than rebuilding each time.",
    "Archive every phase deliverable in long-term storage to preserve a record of what was produced.",
    "Capture lessons learned at the end of each phase and surface them as inputs to the next phase.",
    "Lock decisions made in early phases to prevent revisiting them as later phases begin."
  ],
  "answers": [
    "Carry the evaluation framework and reference set forward across iterations rather than rebuilding each time.",
    "Capture lessons learned at the end of each phase and surface them as inputs to the next phase."
  ]
}
]



