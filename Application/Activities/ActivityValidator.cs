using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
                RuleFor(x=> x.Title).NotEmpty().WithMessage("Please provide a valid Title for the activity");
                RuleFor(x=> x.Description).NotEmpty().WithMessage("Please provide a valid Description for the activity");
                RuleFor(x=> x.Date).NotEmpty().WithMessage("Please provide a valid Date for the activity");
                RuleFor(x=> x.Category).NotEmpty().WithMessage("Please provide a valid Category for the activity");
                RuleFor(x=> x.City).NotEmpty().WithMessage("Please provide a valid City for the activity");
                RuleFor(x=> x.Venue).NotEmpty().WithMessage("Please provide a valid Venue for the activity");
        }
    }
}