use anchor_lang::prelude::*;

declare_id!("STAcademy11111111111111111111111111111111111");

#[program]
pub mod superteam_academy {
    use super::*;

    /// Initialize the academy with an admin authority.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let academy = &mut ctx.accounts.academy;
        academy.authority = ctx.accounts.authority.key();
        academy.total_courses = 0;
        academy.total_certificates = 0;
        Ok(())
    }

    /// Register a new course on-chain.
    pub fn create_course(
        ctx: Context<CreateCourse>,
        slug: String,
        title: String,
        token_gated: bool,
        required_token: Option<Pubkey>,
        required_amount: Option<u64>,
    ) -> Result<()> {
        let course = &mut ctx.accounts.course;
        course.slug = slug;
        course.title = title;
        course.instructor = ctx.accounts.instructor.key();
        course.token_gated = token_gated;
        course.required_token = required_token;
        course.required_amount = required_amount.unwrap_or(0);
        course.total_completions = 0;
        course.created_at = Clock::get()?.unix_timestamp;

        let academy = &mut ctx.accounts.academy;
        academy.total_courses += 1;
        Ok(())
    }

    /// Record a student's course completion checkpoint.
    pub fn complete_checkpoint(
        ctx: Context<CompleteCheckpoint>,
        course_slug: String,
        checkpoint_index: u8,
    ) -> Result<()> {
        let checkpoint = &mut ctx.accounts.checkpoint;
        checkpoint.student = ctx.accounts.student.key();
        checkpoint.course_slug = course_slug;
        checkpoint.checkpoint_index = checkpoint_index;
        checkpoint.completed_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    /// Record course completion (triggers off-chain certificate minting).
    pub fn complete_course(ctx: Context<CompleteCourse>) -> Result<()> {
        let completion = &mut ctx.accounts.completion;
        completion.student = ctx.accounts.student.key();
        completion.course = ctx.accounts.course.key();
        completion.completed_at = Clock::get()?.unix_timestamp;
        completion.certificate_minted = false;

        let course = &mut ctx.accounts.course;
        course.total_completions += 1;
        Ok(())
    }
}

// ── Accounts ───────────────────────────────────────────────────────────────

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + Academy::INIT_SPACE)]
    pub academy: Account<'info, Academy>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(slug: String)]
pub struct CreateCourse<'info> {
    #[account(mut)]
    pub academy: Account<'info, Academy>,
    #[account(
        init,
        payer = instructor,
        space = 8 + CourseAccount::INIT_SPACE,
        seeds = [b"course", slug.as_bytes()],
        bump,
    )]
    pub course: Account<'info, CourseAccount>,
    #[account(mut)]
    pub instructor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(course_slug: String, checkpoint_index: u8)]
pub struct CompleteCheckpoint<'info> {
    #[account(
        init,
        payer = student,
        space = 8 + Checkpoint::INIT_SPACE,
        seeds = [b"checkpoint", student.key().as_ref(), course_slug.as_bytes(), &[checkpoint_index]],
        bump,
    )]
    pub checkpoint: Account<'info, Checkpoint>,
    #[account(mut)]
    pub student: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CompleteCourse<'info> {
    #[account(mut)]
    pub course: Account<'info, CourseAccount>,
    #[account(
        init,
        payer = student,
        space = 8 + Completion::INIT_SPACE,
        seeds = [b"completion", student.key().as_ref(), course.key().as_ref()],
        bump,
    )]
    pub completion: Account<'info, Completion>,
    #[account(mut)]
    pub student: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// ── State ──────────────────────────────────────────────────────────────────

#[account]
#[derive(InitSpace)]
pub struct Academy {
    pub authority: Pubkey,
    pub total_courses: u32,
    pub total_certificates: u32,
}

#[account]
#[derive(InitSpace)]
pub struct CourseAccount {
    #[max_len(64)]
    pub slug: String,
    #[max_len(128)]
    pub title: String,
    pub instructor: Pubkey,
    pub token_gated: bool,
    pub required_token: Option<Pubkey>,
    pub required_amount: u64,
    pub total_completions: u32,
    pub created_at: i64,
}

#[account]
#[derive(InitSpace)]
pub struct Checkpoint {
    pub student: Pubkey,
    #[max_len(64)]
    pub course_slug: String,
    pub checkpoint_index: u8,
    pub completed_at: i64,
}

#[account]
#[derive(InitSpace)]
pub struct Completion {
    pub student: Pubkey,
    pub course: Pubkey,
    pub completed_at: i64,
    pub certificate_minted: bool,
}
