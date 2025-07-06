This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.cursor/
  mcp.json
ALL-GOOD-SAM-DOCS/
  BR1-25-1504 226c487604f481ce943afe0928cf7399.md
  BR1-25-1504_SPONSORS-DATA_UPDATED.md
  Good Sam 226c487604f480e79bd5e1221e652702.md
mcp-neo4j/
  .git/
    hooks/
      applypatch-msg.sample
      commit-msg.sample
      fsmonitor-watchman.sample
      post-update.sample
      pre-applypatch.sample
      pre-commit.sample
      pre-merge-commit.sample
      pre-push.sample
      pre-rebase.sample
      pre-receive.sample
      prepare-commit-msg.sample
      push-to-checkout.sample
      sendemail-validate.sample
      update.sample
    info/
      exclude
    logs/
      refs/
        heads/
          main
        remotes/
          origin/
            HEAD
      HEAD
    refs/
      heads/
        main
      remotes/
        origin/
          HEAD
    config
    description
    HEAD
    packed-refs
  .github/
    workflows/
      pr-mcp-neo4j-cloud-aura-api.yml
      pr-mcp-neo4j-cypher.yml
      pr-mcp-neo4j-data-modeling.yml
      pr-mcp-neo4j-memory.yml
      publish-aura-manager.yml
      publish-cypher.yml
      publish-data-modeling.yml
      publish-memory.yml
  .verdaccio/
    config.yml
  .vscode/
    extensions.json
  servers/
    mcp-neo4j-cloud-aura-api/
      src/
        mcp_neo4j_aura_manager/
          __init__.py
          server.py
      tests/
        test_aura_integration.py
        test_aura_manager.py
        test_utils.py
      .dockerignore
      Dockerfile
      pyproject.toml
      README.md
      test.sh
    mcp-neo4j-cypher/
      src/
        mcp_neo4j_cypher/
          __init__.py
          server.py
      tests/
        integration/
          conftest.py
          test_server_IT.py
      .dockerignore
      .flake8
      .python-version
      CHANGELOG.md
      docker-compose.yml
      Dockerfile
      inspector.sh
      pyproject.toml
      pyrightconfig.json
      README.md
      test.sh
    mcp-neo4j-data-modeling/
      src/
        mcp_neo4j_data_modeling/
          __init__.py
          data_model.py
          server.py
          static.py
      tests/
        integration/
          conftest.py
        unit/
          conftest.py
          test_data_model.py
      .dockerignore
      .flake8
      .python-version
      CHANGELOG.md
      Dockerfile
      Makefile
      pyproject.toml
      pyrightconfig.json
      README.md
    mcp-neo4j-memory/
      src/
        mcp_neo4j_memory/
          __init__.py
          server.py
      tests/
        test_neo4j_memory_integration.py
      .dockerignore
      CHANGELOG.md
      Dockerfile
      pyproject.toml
      README.md
      test.sh
  .editorconfig
  .gitignore
  .prettierignore
  .prettierrc
  glama.json
  LICENSE.txt
  README.md
steps/
  00-noop.step.ts
  00-noop.step.tsx
  01-api.step.ts
  02-test-state.step.ts
  03-check-state-change.step.ts
.env.notes
.gitignore
.python-version
docker-compose.yml
llama-motia-setup.md
main.py
package.json
pyproject.toml
python_packages_backup.txt
requirements.txt
tsconfig.json
types.d.ts
verify_neo4j_connection.py
```

# Files

## File: mcp-neo4j/.git/hooks/applypatch-msg.sample
````
#!/bin/sh
#
# An example hook script to check the commit log message taken by
# applypatch from an e-mail message.
#
# The hook should exit with non-zero status after issuing an
# appropriate message if it wants to stop the commit.  The hook is
# allowed to edit the commit message file.
#
# To enable this hook, rename this file to "applypatch-msg".

. git-sh-setup
commitmsg="$(git rev-parse --git-path hooks/commit-msg)"
test -x "$commitmsg" && exec "$commitmsg" ${1+"$@"}
:
````

## File: mcp-neo4j/.git/hooks/commit-msg.sample
````
#!/bin/sh
#
# An example hook script to check the commit log message.
# Called by "git commit" with one argument, the name of the file
# that has the commit message.  The hook should exit with non-zero
# status after issuing an appropriate message if it wants to stop the
# commit.  The hook is allowed to edit the commit message file.
#
# To enable this hook, rename this file to "commit-msg".

# Uncomment the below to add a Signed-off-by line to the message.
# Doing this in a hook is a bad idea in general, but the prepare-commit-msg
# hook is more suited to it.
#
# SOB=$(git var GIT_AUTHOR_IDENT | sed -n 's/^\(.*>\).*$/Signed-off-by: \1/p')
# grep -qs "^$SOB" "$1" || echo "$SOB" >> "$1"

# This example catches duplicate Signed-off-by lines.

test "" = "$(grep '^Signed-off-by: ' "$1" |
	 sort | uniq -c | sed -e '/^[ 	]*1[ 	]/d')" || {
	echo >&2 Duplicate Signed-off-by lines.
	exit 1
}
````

## File: mcp-neo4j/.git/hooks/fsmonitor-watchman.sample
````
#!/usr/bin/perl

use strict;
use warnings;
use IPC::Open2;

# An example hook script to integrate Watchman
# (https://facebook.github.io/watchman/) with git to speed up detecting
# new and modified files.
#
# The hook is passed a version (currently 2) and last update token
# formatted as a string and outputs to stdout a new update token and
# all files that have been modified since the update token. Paths must
# be relative to the root of the working tree and separated by a single NUL.
#
# To enable this hook, rename this file to "query-watchman" and set
# 'git config core.fsmonitor .git/hooks/query-watchman'
#
my ($version, $last_update_token) = @ARGV;

# Uncomment for debugging
# print STDERR "$0 $version $last_update_token\n";

# Check the hook interface version
if ($version ne 2) {
	die "Unsupported query-fsmonitor hook version '$version'.\n" .
	    "Falling back to scanning...\n";
}

my $git_work_tree = get_working_dir();

my $retry = 1;

my $json_pkg;
eval {
	require JSON::XS;
	$json_pkg = "JSON::XS";
	1;
} or do {
	require JSON::PP;
	$json_pkg = "JSON::PP";
};

launch_watchman();

sub launch_watchman {
	my $o = watchman_query();
	if (is_work_tree_watched($o)) {
		output_result($o->{clock}, @{$o->{files}});
	}
}

sub output_result {
	my ($clockid, @files) = @_;

	# Uncomment for debugging watchman output
	# open (my $fh, ">", ".git/watchman-output.out");
	# binmode $fh, ":utf8";
	# print $fh "$clockid\n@files\n";
	# close $fh;

	binmode STDOUT, ":utf8";
	print $clockid;
	print "\0";
	local $, = "\0";
	print @files;
}

sub watchman_clock {
	my $response = qx/watchman clock "$git_work_tree"/;
	die "Failed to get clock id on '$git_work_tree'.\n" .
		"Falling back to scanning...\n" if $? != 0;

	return $json_pkg->new->utf8->decode($response);
}

sub watchman_query {
	my $pid = open2(\*CHLD_OUT, \*CHLD_IN, 'watchman -j --no-pretty')
	or die "open2() failed: $!\n" .
	"Falling back to scanning...\n";

	# In the query expression below we're asking for names of files that
	# changed since $last_update_token but not from the .git folder.
	#
	# To accomplish this, we're using the "since" generator to use the
	# recency index to select candidate nodes and "fields" to limit the
	# output to file names only. Then we're using the "expression" term to
	# further constrain the results.
	my $last_update_line = "";
	if (substr($last_update_token, 0, 1) eq "c") {
		$last_update_token = "\"$last_update_token\"";
		$last_update_line = qq[\n"since": $last_update_token,];
	}
	my $query = <<"	END";
		["query", "$git_work_tree", {$last_update_line
			"fields": ["name"],
			"expression": ["not", ["dirname", ".git"]]
		}]
	END

	# Uncomment for debugging the watchman query
	# open (my $fh, ">", ".git/watchman-query.json");
	# print $fh $query;
	# close $fh;

	print CHLD_IN $query;
	close CHLD_IN;
	my $response = do {local $/; <CHLD_OUT>};

	# Uncomment for debugging the watch response
	# open ($fh, ">", ".git/watchman-response.json");
	# print $fh $response;
	# close $fh;

	die "Watchman: command returned no output.\n" .
	"Falling back to scanning...\n" if $response eq "";
	die "Watchman: command returned invalid output: $response\n" .
	"Falling back to scanning...\n" unless $response =~ /^\{/;

	return $json_pkg->new->utf8->decode($response);
}

sub is_work_tree_watched {
	my ($output) = @_;
	my $error = $output->{error};
	if ($retry > 0 and $error and $error =~ m/unable to resolve root .* directory (.*) is not watched/) {
		$retry--;
		my $response = qx/watchman watch "$git_work_tree"/;
		die "Failed to make watchman watch '$git_work_tree'.\n" .
		    "Falling back to scanning...\n" if $? != 0;
		$output = $json_pkg->new->utf8->decode($response);
		$error = $output->{error};
		die "Watchman: $error.\n" .
		"Falling back to scanning...\n" if $error;

		# Uncomment for debugging watchman output
		# open (my $fh, ">", ".git/watchman-output.out");
		# close $fh;

		# Watchman will always return all files on the first query so
		# return the fast "everything is dirty" flag to git and do the
		# Watchman query just to get it over with now so we won't pay
		# the cost in git to look up each individual file.
		my $o = watchman_clock();
		$error = $output->{error};

		die "Watchman: $error.\n" .
		"Falling back to scanning...\n" if $error;

		output_result($o->{clock}, ("/"));
		$last_update_token = $o->{clock};

		eval { launch_watchman() };
		return 0;
	}

	die "Watchman: $error.\n" .
	"Falling back to scanning...\n" if $error;

	return 1;
}

sub get_working_dir {
	my $working_dir;
	if ($^O =~ 'msys' || $^O =~ 'cygwin') {
		$working_dir = Win32::GetCwd();
		$working_dir =~ tr/\\/\//;
	} else {
		require Cwd;
		$working_dir = Cwd::cwd();
	}

	return $working_dir;
}
````

## File: mcp-neo4j/.git/hooks/post-update.sample
````
#!/bin/sh
#
# An example hook script to prepare a packed repository for use over
# dumb transports.
#
# To enable this hook, rename this file to "post-update".

exec git update-server-info
````

## File: mcp-neo4j/.git/hooks/pre-applypatch.sample
````
#!/bin/sh
#
# An example hook script to verify what is about to be committed
# by applypatch from an e-mail message.
#
# The hook should exit with non-zero status after issuing an
# appropriate message if it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-applypatch".

. git-sh-setup
precommit="$(git rev-parse --git-path hooks/pre-commit)"
test -x "$precommit" && exec "$precommit" ${1+"$@"}
:
````

## File: mcp-neo4j/.git/hooks/pre-commit.sample
````
#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

if git rev-parse --verify HEAD >/dev/null 2>&1
then
	against=HEAD
else
	# Initial commit: diff against an empty tree object
	against=$(git hash-object -t tree /dev/null)
fi

# If you want to allow non-ASCII filenames set this variable to true.
allownonascii=$(git config --type=bool hooks.allownonascii)

# Redirect output to stderr.
exec 1>&2

# Cross platform projects tend to avoid non-ASCII filenames; prevent
# them from being added to the repository. We exploit the fact that the
# printable range starts at the space character and ends with tilde.
if [ "$allownonascii" != "true" ] &&
	# Note that the use of brackets around a tr range is ok here, (it's
	# even required, for portability to Solaris 10's /usr/bin/tr), since
	# the square bracket bytes happen to fall in the designated range.
	test $(git diff-index --cached --name-only --diff-filter=A -z $against |
	  LC_ALL=C tr -d '[ -~]\0' | wc -c) != 0
then
	cat <<\EOF
Error: Attempt to add a non-ASCII file name.

This can cause problems if you want to work with people on other platforms.

To be portable it is advisable to rename the file.

If you know what you are doing you can disable this check using:

  git config hooks.allownonascii true
EOF
	exit 1
fi

# If there are whitespace errors, print the offending file names and fail.
exec git diff-index --check --cached $against --
````

## File: mcp-neo4j/.git/hooks/pre-merge-commit.sample
````
#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git merge" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message to
# stderr if it wants to stop the merge commit.
#
# To enable this hook, rename this file to "pre-merge-commit".

. git-sh-setup
test -x "$GIT_DIR/hooks/pre-commit" &&
        exec "$GIT_DIR/hooks/pre-commit"
:
````

## File: mcp-neo4j/.git/hooks/pre-push.sample
````
#!/bin/sh

# An example hook script to verify what is about to be pushed.  Called by "git
# push" after it has checked the remote status, but before anything has been
# pushed.  If this script exits with a non-zero status nothing will be pushed.
#
# This hook is called with the following parameters:
#
# $1 -- Name of the remote to which the push is being done
# $2 -- URL to which the push is being done
#
# If pushing without using a named remote those arguments will be equal.
#
# Information about the commits which are being pushed is supplied as lines to
# the standard input in the form:
#
#   <local ref> <local oid> <remote ref> <remote oid>
#
# This sample shows how to prevent push of commits where the log message starts
# with "WIP" (work in progress).

remote="$1"
url="$2"

zero=$(git hash-object --stdin </dev/null | tr '[0-9a-f]' '0')

while read local_ref local_oid remote_ref remote_oid
do
	if test "$local_oid" = "$zero"
	then
		# Handle delete
		:
	else
		if test "$remote_oid" = "$zero"
		then
			# New branch, examine all commits
			range="$local_oid"
		else
			# Update to existing branch, examine new commits
			range="$remote_oid..$local_oid"
		fi

		# Check for WIP commit
		commit=$(git rev-list -n 1 --grep '^WIP' "$range")
		if test -n "$commit"
		then
			echo >&2 "Found WIP commit in $local_ref, not pushing"
			exit 1
		fi
	fi
done

exit 0
````

## File: mcp-neo4j/.git/hooks/pre-rebase.sample
````
#!/bin/sh
#
# Copyright (c) 2006, 2008 Junio C Hamano
#
# The "pre-rebase" hook is run just before "git rebase" starts doing
# its job, and can prevent the command from running by exiting with
# non-zero status.
#
# The hook is called with the following parameters:
#
# $1 -- the upstream the series was forked from.
# $2 -- the branch being rebased (or empty when rebasing the current branch).
#
# This sample shows how to prevent topic branches that are already
# merged to 'next' branch from getting rebased, because allowing it
# would result in rebasing already published history.

publish=next
basebranch="$1"
if test "$#" = 2
then
	topic="refs/heads/$2"
else
	topic=`git symbolic-ref HEAD` ||
	exit 0 ;# we do not interrupt rebasing detached HEAD
fi

case "$topic" in
refs/heads/??/*)
	;;
*)
	exit 0 ;# we do not interrupt others.
	;;
esac

# Now we are dealing with a topic branch being rebased
# on top of master.  Is it OK to rebase it?

# Does the topic really exist?
git show-ref -q "$topic" || {
	echo >&2 "No such branch $topic"
	exit 1
}

# Is topic fully merged to master?
not_in_master=`git rev-list --pretty=oneline ^master "$topic"`
if test -z "$not_in_master"
then
	echo >&2 "$topic is fully merged to master; better remove it."
	exit 1 ;# we could allow it, but there is no point.
fi

# Is topic ever merged to next?  If so you should not be rebasing it.
only_next_1=`git rev-list ^master "^$topic" ${publish} | sort`
only_next_2=`git rev-list ^master           ${publish} | sort`
if test "$only_next_1" = "$only_next_2"
then
	not_in_topic=`git rev-list "^$topic" master`
	if test -z "$not_in_topic"
	then
		echo >&2 "$topic is already up to date with master"
		exit 1 ;# we could allow it, but there is no point.
	else
		exit 0
	fi
else
	not_in_next=`git rev-list --pretty=oneline ^${publish} "$topic"`
	/usr/bin/perl -e '
		my $topic = $ARGV[0];
		my $msg = "* $topic has commits already merged to public branch:\n";
		my (%not_in_next) = map {
			/^([0-9a-f]+) /;
			($1 => 1);
		} split(/\n/, $ARGV[1]);
		for my $elem (map {
				/^([0-9a-f]+) (.*)$/;
				[$1 => $2];
			} split(/\n/, $ARGV[2])) {
			if (!exists $not_in_next{$elem->[0]}) {
				if ($msg) {
					print STDERR $msg;
					undef $msg;
				}
				print STDERR " $elem->[1]\n";
			}
		}
	' "$topic" "$not_in_next" "$not_in_master"
	exit 1
fi

<<\DOC_END

This sample hook safeguards topic branches that have been
published from being rewound.

The workflow assumed here is:

 * Once a topic branch forks from "master", "master" is never
   merged into it again (either directly or indirectly).

 * Once a topic branch is fully cooked and merged into "master",
   it is deleted.  If you need to build on top of it to correct
   earlier mistakes, a new topic branch is created by forking at
   the tip of the "master".  This is not strictly necessary, but
   it makes it easier to keep your history simple.

 * Whenever you need to test or publish your changes to topic
   branches, merge them into "next" branch.

The script, being an example, hardcodes the publish branch name
to be "next", but it is trivial to make it configurable via
$GIT_DIR/config mechanism.

With this workflow, you would want to know:

(1) ... if a topic branch has ever been merged to "next".  Young
    topic branches can have stupid mistakes you would rather
    clean up before publishing, and things that have not been
    merged into other branches can be easily rebased without
    affecting other people.  But once it is published, you would
    not want to rewind it.

(2) ... if a topic branch has been fully merged to "master".
    Then you can delete it.  More importantly, you should not
    build on top of it -- other people may already want to
    change things related to the topic as patches against your
    "master", so if you need further changes, it is better to
    fork the topic (perhaps with the same name) afresh from the
    tip of "master".

Let's look at this example:

		   o---o---o---o---o---o---o---o---o---o "next"
		  /       /           /           /
		 /   a---a---b A     /           /
		/   /               /           /
	       /   /   c---c---c---c B         /
	      /   /   /             \         /
	     /   /   /   b---b C     \       /
	    /   /   /   /             \     /
    ---o---o---o---o---o---o---o---o---o---o---o "master"


A, B and C are topic branches.

 * A has one fix since it was merged up to "next".

 * B has finished.  It has been fully merged up to "master" and "next",
   and is ready to be deleted.

 * C has not merged to "next" at all.

We would want to allow C to be rebased, refuse A, and encourage
B to be deleted.

To compute (1):

	git rev-list ^master ^topic next
	git rev-list ^master        next

	if these match, topic has not merged in next at all.

To compute (2):

	git rev-list master..topic

	if this is empty, it is fully merged to "master".

DOC_END
````

## File: mcp-neo4j/.git/hooks/pre-receive.sample
````
#!/bin/sh
#
# An example hook script to make use of push options.
# The example simply echoes all push options that start with 'echoback='
# and rejects all pushes when the "reject" push option is used.
#
# To enable this hook, rename this file to "pre-receive".

if test -n "$GIT_PUSH_OPTION_COUNT"
then
	i=0
	while test "$i" -lt "$GIT_PUSH_OPTION_COUNT"
	do
		eval "value=\$GIT_PUSH_OPTION_$i"
		case "$value" in
		echoback=*)
			echo "echo from the pre-receive-hook: ${value#*=}" >&2
			;;
		reject)
			exit 1
		esac
		i=$((i + 1))
	done
fi
````

## File: mcp-neo4j/.git/hooks/prepare-commit-msg.sample
````
#!/bin/sh
#
# An example hook script to prepare the commit log message.
# Called by "git commit" with the name of the file that has the
# commit message, followed by the description of the commit
# message's source.  The hook's purpose is to edit the commit
# message file.  If the hook fails with a non-zero status,
# the commit is aborted.
#
# To enable this hook, rename this file to "prepare-commit-msg".

# This hook includes three examples. The first one removes the
# "# Please enter the commit message..." help message.
#
# The second includes the output of "git diff --name-status -r"
# into the message, just before the "git status" output.  It is
# commented because it doesn't cope with --amend or with squashed
# commits.
#
# The third example adds a Signed-off-by line to the message, that can
# still be edited.  This is rarely a good idea.

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

/usr/bin/perl -i.bak -ne 'print unless(m/^. Please enter the commit message/..m/^#$/)' "$COMMIT_MSG_FILE"

# case "$COMMIT_SOURCE,$SHA1" in
#  ,|template,)
#    /usr/bin/perl -i.bak -pe '
#       print "\n" . `git diff --cached --name-status -r`
# 	 if /^#/ && $first++ == 0' "$COMMIT_MSG_FILE" ;;
#  *) ;;
# esac

# SOB=$(git var GIT_COMMITTER_IDENT | sed -n 's/^\(.*>\).*$/Signed-off-by: \1/p')
# git interpret-trailers --in-place --trailer "$SOB" "$COMMIT_MSG_FILE"
# if test -z "$COMMIT_SOURCE"
# then
#   /usr/bin/perl -i.bak -pe 'print "\n" if !$first_line++' "$COMMIT_MSG_FILE"
# fi
````

## File: mcp-neo4j/.git/hooks/push-to-checkout.sample
````
#!/bin/sh

# An example hook script to update a checked-out tree on a git push.
#
# This hook is invoked by git-receive-pack(1) when it reacts to git
# push and updates reference(s) in its repository, and when the push
# tries to update the branch that is currently checked out and the
# receive.denyCurrentBranch configuration variable is set to
# updateInstead.
#
# By default, such a push is refused if the working tree and the index
# of the remote repository has any difference from the currently
# checked out commit; when both the working tree and the index match
# the current commit, they are updated to match the newly pushed tip
# of the branch. This hook is to be used to override the default
# behaviour; however the code below reimplements the default behaviour
# as a starting point for convenient modification.
#
# The hook receives the commit with which the tip of the current
# branch is going to be updated:
commit=$1

# It can exit with a non-zero status to refuse the push (when it does
# so, it must not modify the index or the working tree).
die () {
	echo >&2 "$*"
	exit 1
}

# Or it can make any necessary changes to the working tree and to the
# index to bring them to the desired state when the tip of the current
# branch is updated to the new commit, and exit with a zero status.
#
# For example, the hook can simply run git read-tree -u -m HEAD "$1"
# in order to emulate git fetch that is run in the reverse direction
# with git push, as the two-tree form of git read-tree -u -m is
# essentially the same as git switch or git checkout that switches
# branches while keeping the local changes in the working tree that do
# not interfere with the difference between the branches.

# The below is a more-or-less exact translation to shell of the C code
# for the default behaviour for git's push-to-checkout hook defined in
# the push_to_deploy() function in builtin/receive-pack.c.
#
# Note that the hook will be executed from the repository directory,
# not from the working tree, so if you want to perform operations on
# the working tree, you will have to adapt your code accordingly, e.g.
# by adding "cd .." or using relative paths.

if ! git update-index -q --ignore-submodules --refresh
then
	die "Up-to-date check failed"
fi

if ! git diff-files --quiet --ignore-submodules --
then
	die "Working directory has unstaged changes"
fi

# This is a rough translation of:
#
#   head_has_history() ? "HEAD" : EMPTY_TREE_SHA1_HEX
if git cat-file -e HEAD 2>/dev/null
then
	head=HEAD
else
	head=$(git hash-object -t tree --stdin </dev/null)
fi

if ! git diff-index --quiet --cached --ignore-submodules $head --
then
	die "Working directory has staged changes"
fi

if ! git read-tree -u -m "$commit"
then
	die "Could not update working tree to new HEAD"
fi
````

## File: mcp-neo4j/.git/hooks/sendemail-validate.sample
````
#!/bin/sh

# An example hook script to validate a patch (and/or patch series) before
# sending it via email.
#
# The hook should exit with non-zero status after issuing an appropriate
# message if it wants to prevent the email(s) from being sent.
#
# To enable this hook, rename this file to "sendemail-validate".
#
# By default, it will only check that the patch(es) can be applied on top of
# the default upstream branch without conflicts in a secondary worktree. After
# validation (successful or not) of the last patch of a series, the worktree
# will be deleted.
#
# The following config variables can be set to change the default remote and
# remote ref that are used to apply the patches against:
#
#   sendemail.validateRemote (default: origin)
#   sendemail.validateRemoteRef (default: HEAD)
#
# Replace the TODO placeholders with appropriate checks according to your
# needs.

validate_cover_letter () {
	file="$1"
	# TODO: Replace with appropriate checks (e.g. spell checking).
	true
}

validate_patch () {
	file="$1"
	# Ensure that the patch applies without conflicts.
	git am -3 "$file" || return
	# TODO: Replace with appropriate checks for this patch
	# (e.g. checkpatch.pl).
	true
}

validate_series () {
	# TODO: Replace with appropriate checks for the whole series
	# (e.g. quick build, coding style checks, etc.).
	true
}

# main -------------------------------------------------------------------------

if test "$GIT_SENDEMAIL_FILE_COUNTER" = 1
then
	remote=$(git config --default origin --get sendemail.validateRemote) &&
	ref=$(git config --default HEAD --get sendemail.validateRemoteRef) &&
	worktree=$(mktemp --tmpdir -d sendemail-validate.XXXXXXX) &&
	git worktree add -fd --checkout "$worktree" "refs/remotes/$remote/$ref" &&
	git config --replace-all sendemail.validateWorktree "$worktree"
else
	worktree=$(git config --get sendemail.validateWorktree)
fi || {
	echo "sendemail-validate: error: failed to prepare worktree" >&2
	exit 1
}

unset GIT_DIR GIT_WORK_TREE
cd "$worktree" &&

if grep -q "^diff --git " "$1"
then
	validate_patch "$1"
else
	validate_cover_letter "$1"
fi &&

if test "$GIT_SENDEMAIL_FILE_COUNTER" = "$GIT_SENDEMAIL_FILE_TOTAL"
then
	git config --unset-all sendemail.validateWorktree &&
	trap 'git worktree remove -ff "$worktree"' EXIT &&
	validate_series
fi
````

## File: mcp-neo4j/.git/hooks/update.sample
````
#!/bin/sh
#
# An example hook script to block unannotated tags from entering.
# Called by "git receive-pack" with arguments: refname sha1-old sha1-new
#
# To enable this hook, rename this file to "update".
#
# Config
# ------
# hooks.allowunannotated
#   This boolean sets whether unannotated tags will be allowed into the
#   repository.  By default they won't be.
# hooks.allowdeletetag
#   This boolean sets whether deleting tags will be allowed in the
#   repository.  By default they won't be.
# hooks.allowmodifytag
#   This boolean sets whether a tag may be modified after creation. By default
#   it won't be.
# hooks.allowdeletebranch
#   This boolean sets whether deleting branches will be allowed in the
#   repository.  By default they won't be.
# hooks.denycreatebranch
#   This boolean sets whether remotely creating branches will be denied
#   in the repository.  By default this is allowed.
#

# --- Command line
refname="$1"
oldrev="$2"
newrev="$3"

# --- Safety check
if [ -z "$GIT_DIR" ]; then
	echo "Don't run this script from the command line." >&2
	echo " (if you want, you could supply GIT_DIR then run" >&2
	echo "  $0 <ref> <oldrev> <newrev>)" >&2
	exit 1
fi

if [ -z "$refname" -o -z "$oldrev" -o -z "$newrev" ]; then
	echo "usage: $0 <ref> <oldrev> <newrev>" >&2
	exit 1
fi

# --- Config
allowunannotated=$(git config --type=bool hooks.allowunannotated)
allowdeletebranch=$(git config --type=bool hooks.allowdeletebranch)
denycreatebranch=$(git config --type=bool hooks.denycreatebranch)
allowdeletetag=$(git config --type=bool hooks.allowdeletetag)
allowmodifytag=$(git config --type=bool hooks.allowmodifytag)

# check for no description
projectdesc=$(sed -e '1q' "$GIT_DIR/description")
case "$projectdesc" in
"Unnamed repository"* | "")
	echo "*** Project description file hasn't been set" >&2
	exit 1
	;;
esac

# --- Check types
# if $newrev is 0000...0000, it's a commit to delete a ref.
zero=$(git hash-object --stdin </dev/null | tr '[0-9a-f]' '0')
if [ "$newrev" = "$zero" ]; then
	newrev_type=delete
else
	newrev_type=$(git cat-file -t $newrev)
fi

case "$refname","$newrev_type" in
	refs/tags/*,commit)
		# un-annotated tag
		short_refname=${refname##refs/tags/}
		if [ "$allowunannotated" != "true" ]; then
			echo "*** The un-annotated tag, $short_refname, is not allowed in this repository" >&2
			echo "*** Use 'git tag [ -a | -s ]' for tags you want to propagate." >&2
			exit 1
		fi
		;;
	refs/tags/*,delete)
		# delete tag
		if [ "$allowdeletetag" != "true" ]; then
			echo "*** Deleting a tag is not allowed in this repository" >&2
			exit 1
		fi
		;;
	refs/tags/*,tag)
		# annotated tag
		if [ "$allowmodifytag" != "true" ] && git rev-parse $refname > /dev/null 2>&1
		then
			echo "*** Tag '$refname' already exists." >&2
			echo "*** Modifying a tag is not allowed in this repository." >&2
			exit 1
		fi
		;;
	refs/heads/*,commit)
		# branch
		if [ "$oldrev" = "$zero" -a "$denycreatebranch" = "true" ]; then
			echo "*** Creating a branch is not allowed in this repository" >&2
			exit 1
		fi
		;;
	refs/heads/*,delete)
		# delete branch
		if [ "$allowdeletebranch" != "true" ]; then
			echo "*** Deleting a branch is not allowed in this repository" >&2
			exit 1
		fi
		;;
	refs/remotes/*,commit)
		# tracking branch
		;;
	refs/remotes/*,delete)
		# delete tracking branch
		if [ "$allowdeletebranch" != "true" ]; then
			echo "*** Deleting a tracking branch is not allowed in this repository" >&2
			exit 1
		fi
		;;
	*)
		# Anything else (is there anything else?)
		echo "*** Update hook: unknown type of update to ref $refname of type $newrev_type" >&2
		exit 1
		;;
esac

# --- Finished
exit 0
````

## File: mcp-neo4j/.git/info/exclude
````
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~
````

## File: mcp-neo4j/.git/logs/refs/heads/main
````
0000000000000000000000000000000000000000 d6a0a391c90fa4c3e9dece517ab4634fa4b01fb3 Jeromy J Smith <JeromyJSmith@gmail.com> 1751753219 -0700	clone: from https://github.com/neo4j-contrib/mcp-neo4j.git
````

## File: mcp-neo4j/.git/logs/refs/remotes/origin/HEAD
````
0000000000000000000000000000000000000000 d6a0a391c90fa4c3e9dece517ab4634fa4b01fb3 Jeromy J Smith <JeromyJSmith@gmail.com> 1751753219 -0700	clone: from https://github.com/neo4j-contrib/mcp-neo4j.git
````

## File: mcp-neo4j/.git/logs/HEAD
````
0000000000000000000000000000000000000000 d6a0a391c90fa4c3e9dece517ab4634fa4b01fb3 Jeromy J Smith <JeromyJSmith@gmail.com> 1751753219 -0700	clone: from https://github.com/neo4j-contrib/mcp-neo4j.git
````

## File: mcp-neo4j/.git/refs/heads/main
````
d6a0a391c90fa4c3e9dece517ab4634fa4b01fb3
````

## File: mcp-neo4j/.git/refs/remotes/origin/HEAD
````
ref: refs/remotes/origin/main
````

## File: mcp-neo4j/.git/config
````
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/neo4j-contrib/mcp-neo4j.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
	vscode-merge-base = origin/main
````

## File: mcp-neo4j/.git/description
````
Unnamed repository; edit this file 'description' to name the repository.
````

## File: mcp-neo4j/.git/HEAD
````
ref: refs/heads/main
````

## File: mcp-neo4j/.git/packed-refs
````
# pack-refs with: peeled fully-peeled sorted 
50c52fd73880a5195476c8b7a902e5d7638810d7 refs/remotes/origin/14-add-env-variable-support-and-pin-version-in-config-docs-for-existing-server
611eeb52cd0242073278d28cbd523acc5528011c refs/remotes/origin/26-failed-to-validate-tool-9f1_read_neo4j_cypher-typeerror-cannot-use-in-operator-to-search-for-type-in-true
f9b102fb30b8619b98d34efc7191ea58b4550248 refs/remotes/origin/add-common-dir
797cd993896902d152953613628953ca6e8b1318 refs/remotes/origin/cypher-add-dxt
a32518bfff3c205fa4319832df3586eaaacdf516 refs/remotes/origin/data-modeling-add-aura-data-importer-support
d6a0a391c90fa4c3e9dece517ab4634fa4b01fb3 refs/remotes/origin/main
3fd66f20fd918901ec31f149eb100fc001f6504e refs/remotes/origin/smithery/config-pvzy
7b462a40ca82a13f18ade327fa288162b1ed5b9f refs/remotes/origin/smithery/config-zsfc
340aa98a3a414856165cbc2fcd8c33afe6caa1ba refs/tags/mcp-neo4j-aura-manager-v.0.1.0
d4f489f44e70b173f076e301b8139e889eb57f89 refs/tags/mcp-neo4j-aura-manager-v.0.2.0
3b53ba85c114849c1bc59ec41c7d856128c8d98f refs/tags/mcp-neo4j-aura-manager-v.0.2.1
bd8b0a01bdf3a1313d268d6a91d868cf53a515d1 refs/tags/mcp-neo4j-aura-manager-v0.2.2
33383fc130b3c469ea6229ad1ee3b648d30c14af refs/tags/mcp-neo4j-cypher-v.0.1.1
d00ad4171795c736c4fb9b3d0ae521ba2e54fa73 refs/tags/mcp-neo4j-cypher-v0.2.0
9c42e4d856c6804d1e4f45c59a18152c9024c68a refs/tags/mcp-neo4j-cypher-v0.2.1
3ccc3ff76763a3cdce3f389bff67339b1fac32c1 refs/tags/mcp-neo4j-cypher-v0.2.2
f437920abcf736835a3f41c8b092739d7b52b4d4 refs/tags/mcp-neo4j-cypher-v0.2.3
d6a0a391c90fa4c3e9dece517ab4634fa4b01fb3 refs/tags/mcp-neo4j-cypher-v0.2.4
fc98eb1a3ef2386e72ec962e2e4b4fc2cee90639 refs/tags/mcp-neo4j-data-modeling-v0.1.0
ff3dcd2544094e84ed204b6b7548212f7fcbfd90 refs/tags/mcp-neo4j-data-modeling-v0.1.1
697a59a10a119c1425d35d77fd8190483888375c refs/tags/mcp-neo4j-memory-v.0.1.1
da69f707ec51c08789822629a62f27c8f792a59b refs/tags/mcp-neo4j-memory-v0.1.2
6ffd2d4f0eda9f2aff65c41bc81c4a7e8ac42e9f refs/tags/mcp-neo4j-memory-v0.1.3
88b188b190281d3aff9c478b6e5c070b7c0c4731 refs/tags/mcp-neo4j-memory-v0.1.5
````

## File: mcp-neo4j/.github/workflows/pr-mcp-neo4j-cloud-aura-api.yml
````yaml
name: MCP Neo4j Cloud Aura API Tests

on:
  push:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-cloud-aura-api/**'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-cloud-aura-api/**'
  workflow_dispatch:  # Allows manual triggering of the workflow

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python 3.12
      uses: actions/setup-python@v4
      with:
        python-version: '3.12'
    
    - name: Install UV
      run: |
        curl -LsSf https://astral.sh/uv/install.sh | sh
        echo "$HOME/.cargo/bin" >> $GITHUB_PATH
    
    - name: Install dependencies
      run: |
        cd servers/mcp-neo4j-cloud-aura-api
        uv venv
        uv pip install -e ".[dev]"

    - name: Run tests
      run: |
        cd servers/mcp-neo4j-cloud-aura-api
        ./test.sh
````

## File: mcp-neo4j/.github/workflows/pr-mcp-neo4j-cypher.yml
````yaml
name: MCP Neo4j Cypher Tests

on:
  push:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-cypher/**'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-cypher/**'
  workflow_dispatch:  # Allows manual triggering of the workflow

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python 3.12
      uses: actions/setup-python@v4
      with:
        python-version: '3.12'
    
    - name: Install UV
      run: |
        curl -LsSf https://astral.sh/uv/install.sh | sh
        echo "$HOME/.cargo/bin" >> $GITHUB_PATH
    
    - name: Install dependencies
      run: |
        cd servers/mcp-neo4j-cypher
        uv venv
        uv pip install -e ".[dev]"

    - name: Check format and linting
      run: |
        cd servers/mcp-neo4j-cypher
        uv run ruff check --select I . --fix
        uv run ruff check --fix .
        uv run ruff format .
    
    - name: Run tests
      run: |
        cd servers/mcp-neo4j-cypher
        ./test.sh
````

## File: mcp-neo4j/.github/workflows/pr-mcp-neo4j-data-modeling.yml
````yaml
name: MCP Neo4j Data Modeling Tests

on:
  push:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-data-modeling/**'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-data-modeling/**'
  workflow_dispatch:  # Allows manual triggering of the workflow

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python 3.12
      uses: actions/setup-python@v4
      with:
        python-version: '3.12'
    
    - name: Install UV
      run: |
        curl -LsSf https://astral.sh/uv/install.sh | sh
        echo "$HOME/.cargo/bin" >> $GITHUB_PATH
    
    - name: Install dependencies
      run: |
        cd servers/mcp-neo4j-data-modeling
        uv venv
        uv pip install -e ".[dev]"

    - name: Check format and linting
      run: |
        cd servers/mcp-neo4j-data-modeling
        make format
    
    - name: Run tests
      run: |
        cd servers/mcp-neo4j-data-modeling
        make test
````

## File: mcp-neo4j/.github/workflows/pr-mcp-neo4j-memory.yml
````yaml
name: MCP Neo4j Memory Tests

on:
  push:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-memory/**'
  pull_request:
    branches: [ main, master ]
    paths:
      - 'servers/mcp-neo4j-memory/**'
  workflow_dispatch:  # Allows manual triggering of the workflow

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python 3.12
      uses: actions/setup-python@v4
      with:
        python-version: '3.12'
    
    - name: Install UV
      run: |
        curl -LsSf https://astral.sh/uv/install.sh | sh
        echo "$HOME/.cargo/bin" >> $GITHUB_PATH
    
    - name: Install dependencies
      run: |
        cd servers/mcp-neo4j-memory
        uv venv
        uv pip install -e ".[dev]"
    
    - name: Run tests
      run: |
        cd servers/mcp-neo4j-memory
        ./test.sh
````

## File: mcp-neo4j/.github/workflows/publish-aura-manager.yml
````yaml
# This workflow will upload a Python Package to PyPI when a release is created
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python#publishing-to-package-registries

# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: Publish Neo4j MCP Aura Manager Package

on:
  push:
    tags:
      - mcp-neo4j-aura-manager-v*
  workflow_dispatch:  # Allows manual triggering of the workflow

permissions:
  contents: read

jobs:

  pypi-publish:
    runs-on: ubuntu-latest

    permissions:
      # IMPORTANT: this permission is mandatory for trusted publishing
      id-token: write

    # Dedicated environments with protections for publishing are strongly recommended.
    # For more information, see: https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-protection-rules
    environment:
      name: pypi
      url: https://pypi.org/project/mcp-neo4j-aura-manager/

    steps:

      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v5

      - name: "Set up Python"
        uses: actions/setup-python@v5
        with:
          python-version-file: "servers/mcp-neo4j-cloud-aura-api/pyproject.toml"

      - name: Build release distributions
        run: |
          cd servers/mcp-neo4j-cloud-aura-api/
          uv build

      - name: Publish release
        env:
          UV_PUBLISH_TOKEN: ${{ secrets.PYPI_API_TOKEN }}
        run: |
          cd servers/mcp-neo4j-cloud-aura-api/
          uv publish
````

## File: mcp-neo4j/.github/workflows/publish-cypher.yml
````yaml
# This workflow will upload a Python Package to PyPI when a release is created
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python#publishing-to-package-registries

# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: Publish Neo4j MCP Cypher Package

on:
  push:
    tags:
      - mcp-neo4j-cypher-v*
  workflow_dispatch:  # Allows manual triggering of the workflow

permissions:
  contents: read

jobs:
  release-build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.x"

      - name: Build release distributions
        run: |
          cd servers/mcp-neo4j-cypher/
          python -m pip install build
          python -m build

      - name: Upload distributions
        uses: actions/upload-artifact@v4
        with:
          name: release-dists
          path: servers/mcp-neo4j-cypher/dist/

  pypi-publish:
    runs-on: ubuntu-latest
    needs:
      - release-build
    permissions:
      # IMPORTANT: this permission is mandatory for trusted publishing
      id-token: write

    # Dedicated environments with protections for publishing are strongly recommended.
    # For more information, see: https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-protection-rules
    environment:
      name: pypi
      url: https://pypi.org/project/mcp-neo4j-cypher/

    steps:

      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v5

      - name: "Set up Python"
        uses: actions/setup-python@v5
        with:
          python-version-file: "servers/mcp-neo4j-cypher/pyproject.toml"

      - name: Build release distributions
        run: |
          cd servers/mcp-neo4j-cypher/
          uv build

      - name: Publish release
        env:
          UV_PUBLISH_TOKEN: ${{ secrets.PYPI_API_TOKEN }}
        run: |
          cd servers/mcp-neo4j-cypher/
          uv publish
````

## File: mcp-neo4j/.github/workflows/publish-data-modeling.yml
````yaml
# This workflow will upload a Python Package to PyPI when a release is created
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python#publishing-to-package-registries

# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: Publish Neo4j MCP Data Modeling Package

on:
  push:
    tags:
      - mcp-neo4j-data-modeling-v*
  workflow_dispatch:  # Allows manual triggering of the workflow

permissions:
  contents: read

jobs:
  release-build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.x"

      - name: Build release distributions
        run: |
          cd servers/mcp-neo4j-data-modeling/
          python -m pip install build
          python -m build

      - name: Upload distributions
        uses: actions/upload-artifact@v4
        with:
          name: release-dists
          path: servers/mcp-neo4j-data-modeling/dist/

  pypi-publish:
    runs-on: ubuntu-latest
    needs:
      - release-build
    permissions:
      # IMPORTANT: this permission is mandatory for trusted publishing
      id-token: write

    # Dedicated environments with protections for publishing are strongly recommended.
    # For more information, see: https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-protection-rules
    environment:
      name: pypi
      url: https://pypi.org/project/mcp-neo4j-data-modeling/

    steps:

      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v5

      - name: "Set up Python"
        uses: actions/setup-python@v5
        with:
          python-version-file: "servers/mcp-neo4j-data-modeling/pyproject.toml"

      - name: Build release distributions
        run: |
          cd servers/mcp-neo4j-data-modeling/
          uv build

      - name: Publish release
        env:
          UV_PUBLISH_TOKEN: ${{ secrets.PYPI_API_TOKEN }}
        run: |
          cd servers/mcp-neo4j-data-modeling/
          uv publish
````

## File: mcp-neo4j/.github/workflows/publish-memory.yml
````yaml
# This workflow will upload a Python Package to PyPI when a release is created
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python#publishing-to-package-registries

# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: Publish Neo4j MCP Memory Python Package

on:
  push:
    tags:
      - mcp-neo4j-memory-v*
  workflow_dispatch:  # Allows manual triggering of the workflow

permissions:
  contents: read

jobs:

  pypi-publish:
    runs-on: ubuntu-latest

    permissions:
      # IMPORTANT: this permission is mandatory for trusted publishing
      id-token: write

    # Dedicated environments with protections for publishing are strongly recommended.
    # For more information, see: https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-protection-rules
    environment:
      name: pypi
      url: https://pypi.org/project/mcp-neo4j-memory/

    steps:

      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v5

      - name: "Set up Python"
        uses: actions/setup-python@v5
        with:
          python-version-file: "servers/mcp-neo4j-memory/pyproject.toml"

      - name: Build release distributions
        run: |
          cd servers/mcp-neo4j-memory/
          uv build

      - name: Publish release
        env:
          UV_PUBLISH_TOKEN: ${{ secrets.PYPI_API_TOKEN }}
        run: |
          cd servers/mcp-neo4j-memory/
          uv publish
````

## File: mcp-neo4j/.verdaccio/config.yml
````yaml
# path to a directory with all packages
storage: ../tmp/local-registry/storage

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    maxage: 60m

packages:
  '**':
    # give all users (including non-authenticated users) full access
    # because it is a local registry
    access: $all
    publish: $all
    unpublish: $all

    # if package is not available locally, proxy requests to npm registry
    proxy: npmjs

# log settings
log:
  type: stdout
  format: pretty
  level: warn

publish:
  allow_offline: true # set offline to true to allow publish offline
````

## File: mcp-neo4j/.vscode/extensions.json
````json
{
  "recommendations": [
    "nrwl.angular-console",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "firsttris.vscode-jest-runner"
  ]
}
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/src/mcp_neo4j_aura_manager/__init__.py
````python
from . import server
import asyncio
import argparse
import os
import logging
import sys 


# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def main():
    """Main entry point for the application."""
    parser = argparse.ArgumentParser(description="Neo4j Aura Database Instance Manager")
    parser.add_argument("--client-id", help="Neo4j Aura API Client ID", 
                        default=os.environ.get("NEO4J_AURA_CLIENT_ID"))
    parser.add_argument("--client-secret", help="Neo4j Aura API Client Secret", 
                        default=os.environ.get("NEO4J_AURA_CLIENT_SECRET"))
    
    args = parser.parse_args()
    
    if not args.client_id or not args.client_secret:
        logger.error("Client ID and Client Secret are required. Provide them as arguments or environment variables.")
        sys.exit(1)
    
    try:
        asyncio.run(server.main(args.client_id, args.client_secret))
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Error starting server: {str(e)}")
        sys.exit(1)

# Optionally expose other important items at package level
__all__ = ["main", "server"]
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/src/mcp_neo4j_aura_manager/server.py
````python
import json
import logging
import time
from typing import Any, Dict, List, Optional, Union

import mcp
import requests
import mcp.types as types
from mcp.server import NotificationOptions, Server
from mcp.server.models import InitializationOptions
import mcp.server.stdio


# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def _validate_region(cloud_provider: str, region: str) -> None:
    """
    Validate the region exists for the given cloud provider.

    Args:
        cloud_provider: The cloud provider to validate the region for
        region: The region to validate

    Returns:
        None
    
    Raises:
        ValueError: If the region is not valid for the given cloud provider
    """

    if cloud_provider == "gcp" and region.count("-") != 1:
        raise ValueError(f"Invalid region for GCP: {region}. Must follow the format 'region-zonenumber'. Refer to https://neo4j.com/docs/aura/managing-instances/regions/ for valid regions.")
    elif cloud_provider == "aws" and region.count("-") != 2:
        raise ValueError(f"Invalid region for AWS: {region}. Must follow the format 'region-zone-number'. Refer to https://neo4j.com/docs/aura/managing-instances/regions/ for valid regions.")
    elif cloud_provider == "azure" and region.count("-") != 0:
        raise ValueError(f"Invalid region for Azure: {region}. Must follow the format 'regionzone'. Refer to https://neo4j.com/docs/aura/managing-instances/regions/ for valid regions.")

    
class AuraAPIClient:
    """Client for interacting with Neo4j Aura API."""
    
    BASE_URL = "https://api.neo4j.io/v1"
    
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.token = None
        self.token_expiry = 0
    
    def _get_auth_token(self) -> str:
        """Get authentication token for Aura API."""
        auth_url = "https://api.neo4j.io/oauth/token"
        
        # Create base64 encoded credentials
        import base64
        credentials = f"{self.client_id}:{self.client_secret}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        
        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        payload = {
            "grant_type": "client_credentials"
        }
        
        try:
            response = requests.post(auth_url, headers=headers, data=payload)
            response.raise_for_status()
            token_data = response.json()
            if not isinstance(token_data, dict) or \
               not token_data.get("access_token") or \
               not token_data.get("expires_in") or \
               not token_data.get("token_type") or \
               token_data.get("token_type").lower() != "bearer":
                raise Exception("Invalid token response format")
            self.token = token_data["access_token"]
            return self.token
        except requests.RequestException as e:
            logger.error(f"Authentication error: {str(e)}")
            raise Exception(f"Failed to authenticate with Neo4j Aura API: {str(e)}")
    
    def _get_headers(self) -> Dict[str, str]:
        """Get headers for API requests including authentication."""
        current_time = time.time()
        if not self.token or current_time >= self.token_expiry:
            self.token = self._get_auth_token()
            
        return {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    
    def _handle_response(self, response: requests.Response) -> Dict[str, Any]:
        """Handle API response and errors."""
        try:
            response.raise_for_status()
            data = response.json()
            if "data" in data:
                return data["data"]
            else:
                return data
        except requests.HTTPError as e:
            error_msg = f"HTTP error: {e}"
            try:
                error_data = response.json()
                if "message" in error_data:
                    error_msg = f"{error_msg} - {error_data['message']}"
            except:
                pass
            logger.error(error_msg)
            raise Exception(error_msg)
        except requests.RequestException as e:
            logger.error(f"Request error: {str(e)}")
            raise Exception(f"API request failed: {str(e)}")
        except json.JSONDecodeError:
            logger.error("Failed to parse API response")
            raise Exception("Failed to parse API response")
    
    def list_instances(self) -> List[Dict[str, Any]]:
        """List all database instances."""
        url = f"{self.BASE_URL}/instances"
        response = requests.get(url, headers=self._get_headers())
        return self._handle_response(response)
    
    def get_instance_details(self, instance_ids: Union[str, List[str]]) -> Union[Dict[str, Any], List[Dict[str, Any]]]:
        """Get details for one or more instances by ID.
        
        Args:
            instance_ids: Either a single instance ID string or a list of instance ID strings
            
        Returns:
            A single instance details dict or a list of instance details dicts
        """
        if isinstance(instance_ids, str):
            # Handle single instance ID
            url = f"{self.BASE_URL}/instances/{instance_ids}"
            response = requests.get(url, headers=self._get_headers())
            return self._handle_response(response)
        else:
            # Handle list of instance IDs
            results = []
            for instance_id in instance_ids:
                url = f"{self.BASE_URL}/instances/{instance_id}"
                response = requests.get(url, headers=self._get_headers())
                try:
                    data = self._handle_response(response)
                    results.append(data)
                except Exception as e:
                    results.append({"error": str(e), "instance_id": instance_id})
            return results
    
    def get_instance_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        """Find an instance by name."""
        instances = self.list_instances()
        for instance in instances:
            if name.lower() in instance.get("name", "").lower():
                # Get full instance details using the instance ID
                return self.get_instance_details(instance.get("id"))
        return None
    
    def create_instance(self, tenant_id: str, name: str, memory: int = 1, region: str = "europe-west1", 
                        version: str = "5", type: str = "free-db", 
                        vector_optimized: bool = False,
                        cloud_provider: str = "gcp", graph_analytics_plugin: bool = False,
                        source_instance_id: str = None) -> Dict[str, Any]:
        """Create a new database instance."""
        if tenant_id is None:
            raise ValueError("tenant_id is required")
        
        # Always set version to "5"
        version = "5"
        
        # Validate based on instance type
        if type == "free-db":
            if memory != 1:
                raise ValueError("free-db instances can only have 1GB memory")
            
            if not cloud_provider == "gcp":
                raise ValueError("free-db instances can only be created in GCP regions")
            
            if vector_optimized:
                raise ValueError("free-db instances cannot be vector optimized")
        
        # Validate for professional/enterprise/business-critical types
        elif type in ["professional-db", "enterprise-db", "business-critical"]:
            if cloud_provider and cloud_provider not in ["gcp", "aws", "azure"]:
                raise ValueError("cloud_provider must be one of: gcp, aws, azure")
            
            if vector_optimized and memory < 4:
                raise ValueError("vector optimized instances must have at least 4GB memory")
            
            # If cloning, source_instance_id is required
            if source_instance_id is not None:
                if not isinstance(source_instance_id, str):
                    raise ValueError("source_instance for clone from instance must be defined")
        else:
            raise ValueError(f"Invalid type {type}")
        
        _validate_region(cloud_provider, region)
            
        url = f"{self.BASE_URL}/instances"
        payload = {
            "name": name,
            "memory": f"{memory}GB",  # in GB
            "region": region,
            "version": version,
            "type": type,
            "tenant_id": tenant_id,
            "cloud_provider": cloud_provider
        }
        
        # Add optional parameters only if they're provided and applicable            
        if graph_analytics_plugin and type in ["professional-db", "enterprise-db", "business-critical"]:
            payload["graph_analytics_plugin"] = str(graph_analytics_plugin).lower()
            
        if vector_optimized and type in ["professional-db", "enterprise-db", "business-critical"]:
            payload["vector_optimized"] = str(vector_optimized).lower()
            
        if source_instance_id and type in ["professional-db", "enterprise-db", "business-critical"]:
            payload["source_instance_id"] = source_instance_id
        
        response = requests.post(url, headers=self._get_headers(), json=payload)
        return self._handle_response(response)

    
    def update_instance(self, instance_id: str, name: Optional[str] = None, 
                        memory: Optional[int] = None, 
                        vector_optimized: Optional[bool] = None, 
                        storage: Optional[int] = None) -> Dict[str, Any]:
        """Update an existing instance."""
        url = f"{self.BASE_URL}/instances/{instance_id}"
        
        payload = {}
        if name is not None:
            payload["name"] = name
        if memory is not None:
            payload["memory"] = f"{memory}GB"
            payload["storage"] = f"{2*memory}GB"
        if storage is not None:
            payload["storage"] = f"{storage}GB"
        if vector_optimized is not None:
            payload["vector_optimized"] = str(vector_optimized).lower()
        
        if payload["vector_optimized"] == "true" and int(payload["memory"]) < 4:
            raise ValueError("vector optimized instances must have at least 4GB memory")
        
        print("Update instance payload:")
        print(payload)
        response = requests.patch(url, headers=self._get_headers(), json=payload)
        print("Update instance response: "+str(response.status_code))
        print(response.json())
        return self._handle_response(response)
    
    def pause_instance(self, instance_id: str) -> Dict[str, Any]:
        """Pause a database instance."""
        url = f"{self.BASE_URL}/instances/{instance_id}/pause"
        response = requests.post(url, headers=self._get_headers())
        return self._handle_response(response)
    
    def resume_instance(self, instance_id: str) -> Dict[str, Any]:
        """Resume a paused database instance."""
        url = f"{self.BASE_URL}/instances/{instance_id}/resume"
        response = requests.post(url, headers=self._get_headers())
        return self._handle_response(response)
    
    def list_tenants(self) -> List[Dict[str, Any]]:
        """List all tenants/projects."""
        url = f"{self.BASE_URL}/tenants"
        response = requests.get(url, headers=self._get_headers())
        return self._handle_response(response)
    
    def get_tenant_details(self, tenant_id: str) -> Dict[str, Any]:
        """Get details for a specific tenant/project."""
        url = f"{self.BASE_URL}/tenants/{tenant_id}"
        response = requests.get(url, headers=self._get_headers())
        return self._handle_response(response)

    def delete_instance(self, instance_id: str) -> Dict[str, Any]:
        """Delete a database instance.
        
        Args:
            instance_id: ID of the instance to delete
            
        Returns:
            Response dict with status information
        """
        url = f"{self.BASE_URL}/instances/{instance_id}"
        response = requests.delete(url, headers=self._get_headers())
        return self._handle_response(response)

class AuraManager:
    """MCP server for Neo4j Aura instance management."""
    
    def __init__(self, client_id: str, client_secret: str):
        self.client = AuraAPIClient(client_id, client_secret)
    
    async def list_instances(self, **kwargs) -> Dict[str, Any]:
        """List all Aura database instances."""
        try:
            instances = self.client.list_instances()
            return {
                "instances": instances,
                "count": len(instances)
            }
        except Exception as e:
            return {"error": str(e)}
    
    async def get_instance_details(self, instance_ids: List[str], **kwargs) -> Dict[str, Any]:
        """Get details for one or more instances by ID."""
        try:
            results = self.client.get_instance_details(instance_ids)
            return {
                "instances": results,
                "count": len(results)
            }
        except Exception as e:
            return {"error": str(e)}
    
    async def get_instance_by_name(self, name: str, **kwargs) -> Dict[str, Any]:
        """Find an instance by name."""
        try:
            instance = self.client.get_instance_by_name(name)
            if instance:
                return instance
            return {"error": f"Instance with name '{name}' not found"}
        except Exception as e:
            return {"error": str(e)}
    
    async def create_instance(self, tenant_id: str, name: str, memory: int = 1, region: str = "us-central1", 
                             version: str = "5", type: str = "free-db", 
                             vector_optimized: bool = False,
                             cloud_provider: str = "gcp", graph_analytics_plugin: bool = False,
                             source_instance_id: str = None, **kwargs) -> Dict[str, Any]:
        """Create a new database instance."""
        try:
            return self.client.create_instance(
                tenant_id=tenant_id,
                name=name,
                memory=memory,
                region=region,
                version=version,
                type=type,
                vector_optimized=vector_optimized,
                cloud_provider=cloud_provider,
                graph_analytics_plugin=graph_analytics_plugin,
                source_instance_id=source_instance_id
            )
        except Exception as e:
            return {"error": str(e)}
    
    async def update_instance_name(self, instance_id: str, name: str, **kwargs) -> Dict[str, Any]:
        """Update an instance's name."""
        try:
            return self.client.update_instance(instance_id=instance_id, name=name)
        except Exception as e:
            return {"error": str(e)}
    
    async def update_instance_memory(self, instance_id: str, memory: int, **kwargs) -> Dict[str, Any]:
        """Update an instance's memory allocation."""
        try:
            return self.client.update_instance(instance_id=instance_id, memory=memory)
        except Exception as e:
            return {"error": str(e)}
    
    async def update_instance_vector_optimization(self, instance_id: str, 
                                                vector_optimized: bool, **kwargs) -> Dict[str, Any]:
        """Update an instance's vector optimization setting."""
        try:
            return self.client.update_instance(
                instance_id=instance_id, 
                vector_optimized=vector_optimized
            )
        except Exception as e:
            return {"error": str(e)}
    
    async def pause_instance(self, instance_id: str, **kwargs) -> Dict[str, Any]:
        """Pause a database instance."""
        try:
            return self.client.pause_instance(instance_id)
        except Exception as e:
            return {"error": str(e)}
    
    async def resume_instance(self, instance_id: str, **kwargs) -> Dict[str, Any]:
        """Resume a paused database instance."""
        try:
            return self.client.resume_instance(instance_id)
        except Exception as e:
            return {"error": str(e)}
    
    async def list_tenants(self, **kwargs) -> Dict[str, Any]:
        """List all tenants/projects."""
        try:
            tenants = self.client.list_tenants()
            return {
                "tenants": tenants,
                "count": len(tenants)
            }
        except Exception as e:
            return {"error": str(e)}
    
    async def get_tenant_details(self, tenant_id: str, **kwargs) -> Dict[str, Any]:
        """Get details for a specific tenant/project."""
        try:
            return self.client.get_tenant_details(tenant_id)
        except Exception as e:
            return {"error": str(e)}

    async def delete_instance(self, instance_id: str, **kwargs) -> Dict[str, Any]:
        """Delete one database instance."""
        try:
            return self.client.delete_instance(instance_id=instance_id)
        except Exception as e:
            return {"error": str(e)}

async def main(client_id: str, client_secret: str):
    """Start the MCP server."""
    aura_manager = AuraManager(client_id, client_secret)
    
    # Create MCP server
    server = Server("mcp-neo4j-aura-manager")

    # Register handlers
    @server.list_tools()
    async def handle_list_tools() -> List[types.Tool]:
        return [
            types.Tool(
                name="list_instances",
                description="List all Neo4j Aura database instances",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": True,
                    "title": "List all Neo4j Aura database instances"
                },
                inputSchema={
                    "type": "object",
                    "properties": {},
                },
            ),
            types.Tool(
                name="get_instance_details",
                description="Get details for one or more Neo4j Aura instances by ID, including status, region, memory, storage",
                annotations={
                    "destructiveHint": False, 
                    "idempotentHint": True,
                    "readOnlyHint": True,
                    "title": "Get instance details"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_ids": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            },
                            "description": "List of instance IDs to retrieve"
                        }
                    },
                    "required": ["instance_ids"],
                },
            ),
            types.Tool(
                name="get_instance_by_name",
                description="Find a Neo4j Aura instance by name and returns the details including the id",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": True,
                    "title": "Find instance by name"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "Name of the instance to find"
                        }
                    },
                    "required": ["name"],
                },
            ),
            types.Tool(
                name="create_instance",
                description="Create a new Neo4j Aura database instance",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": False,
                    "readOnlyHint": False,
                    "title": "Create instance"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "tenant_id": {
                            "type": "string",
                            "description": "ID of the tenant/project where the instance will be created"
                        },
                        "name": {
                            "type": "string",
                            "description": "Name for the new instance"
                        },
                        "memory": {
                            "type": "integer",
                            "description": "Memory allocation in GB",
                            "default": 1
                        },
                        "region": {
                            "type": "string",
                            "description": "Region for the instance (e.g., 'us-central1')",
                            "default": "us-central1"
                        },
                        "type": {
                            "type": "string",
                            "description": "Instance type (free-db, professional-db, enterprise-db, or business-critical)",
                            "default": "free-db"
                        },
                        "vector_optimized": {
                            "type": "boolean",
                            "description": "Whether the instance is optimized for vector operations. Only allowed for instance with more than 4GB memory.",
                            "default": False
                        },
                        "cloud_provider": {
                            "type": "string",
                            "description": "Cloud provider (gcp, aws, azure)",
                            "default": "gcp"
                        },
                        "graph_analytics_plugin": {
                            "type": "boolean",
                            "description": "Whether to enable the graph analytics plugin",
                            "default": False
                        },
                        "source_instance_id": {
                            "type": "string",
                            "description": "ID of the source instance to clone from (for professional/enterprise instances)",
                        }
                    },
                    "required": ["tenant_id", "name"],
                },
            ),
            types.Tool(
                name="update_instance_name",
                description="Update the name of a Neo4j Aura instance",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": False,
                    "title": "Update instance name"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_id": {
                            "type": "string",
                            "description": "ID of the instance to update"
                        },
                        "name": {
                            "type": "string",
                            "description": "New name for the instance"
                        }
                    },
                    "required": ["instance_id", "name"],
                },
            ),
            types.Tool(
                name="update_instance_memory",
                description="Update the memory allocation of a Neo4j Aura instance",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": False,
                    "title": "Update instance memory"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_id": {
                            "type": "string",
                            "description": "ID of the instance to update"
                        },
                        "memory": {
                            "type": "integer",
                            "description": "New memory allocation in GB"
                        }
                    },
                    "required": ["instance_id", "memory"],
                },
            ),
            types.Tool(
                name="update_instance_vector_optimization",
                description="Update the vector optimization setting of a Neo4j Aura instance",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": False,
                    "title": "Update instance vector optimization"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_id": {
                            "type": "string",
                            "description": "ID of the instance to update"
                        },
                        "vector_optimized": {
                            "type": "boolean",
                            "description": "Whether the instance should be optimized for vector operations"
                        }
                    },
                    "required": ["instance_id", "vector_optimized"],
                },
            ),
            types.Tool(
                name="pause_instance",
                description="Pause a Neo4j Aura database instance",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": False,
                    "readOnlyHint": False,
                    "title": "Pause instance"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_id": {
                            "type": "string",
                            "description": "ID of the instance to pause"
                        }
                    },
                    "required": ["instance_id"],
                },
            ),
            types.Tool(
                name="resume_instance",
                description="Resume a paused Neo4j Aura database instance",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": False,
                    "readOnlyHint": False,
                    "title": "Resume instance"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_id": {
                            "type": "string",
                            "description": "ID of the instance to resume"
                        }
                    },
                    "required": ["instance_id"],
                },
            ),
            types.Tool(
                name="list_tenants",
                description="List all Neo4j Aura tenants/projects",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": True,
                    "title": "List tenants"
                },
                inputSchema={
                    "type": "object",
                    "properties": {},
                },
            ),
            types.Tool(
                name="get_tenant_details",
                description="Get details for a specific Neo4j Aura tenant/project",
                annotations={
                    "destructiveHint": False,
                    "idempotentHint": True,
                    "readOnlyHint": True,
                    "title": "Get tenant details"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "tenant_id": {
                            "type": "string",
                            "description": "ID of the tenant/project to retrieve"
                        }
                    },
                    "required": ["tenant_id"],
                },
            ),
            types.Tool(
                name="delete_instance",
                description="Delete a Neo4j Aura database instance",
                annotations={
                    "destructiveHint": True,
                    "idempotentHint": False,
                    "readOnlyHint": False,
                    "title": "Delete instance"
                },
                inputSchema={
                    "type": "object",
                    "properties": {
                        "instance_id": {
                            "type": "string",
                            "description": "ID of the instance to delete"
                        }
                    },
                    "required": ["instance_id"],
                },
            ),
        ]

    @server.call_tool()
    async def handle_call_tool(
        name: str, arguments: Dict[str, Any] | None
    ) -> List[types.TextContent | types.ImageContent]:
        try:
            if not arguments and name not in ["list_instances", "list_tenants"]:
                raise ValueError(f"No arguments provided for tool: {name}")

            if name == "list_instances":
                result = await aura_manager.list_instances()
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "get_instance_details":
                result = await aura_manager.get_instance_details(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "get_instance_by_name":
                result = await aura_manager.get_instance_by_name(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "create_instance":
                result = await aura_manager.create_instance(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "update_instance_name":
                result = await aura_manager.update_instance_name(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "update_instance_memory":
                result = await aura_manager.update_instance_memory(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "update_instance_vector_optimization":
                result = await aura_manager.update_instance_vector_optimization(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "pause_instance":
                result = await aura_manager.pause_instance(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "resume_instance":
                result = await aura_manager.resume_instance(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "list_tenants":
                result = await aura_manager.list_tenants()
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "get_tenant_details":
                result = await aura_manager.get_tenant_details(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "delete_instance":
                result = await aura_manager.delete_instance(**arguments)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            else:
                raise ValueError(f"Unknown tool: {name}")
                
        except Exception as e:
            logger.error(f"Error handling tool call: {e}")
            return [types.TextContent(type="text", text=f"Error: {str(e)}")]

    # Start the server
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        logger.info("Neo4j Aura Database Manager MCP Server running on stdio")
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="mcp-neo4j-aura-manager",
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )
    
    return server


if __name__ == "__main__":
    main()
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/tests/test_aura_integration.py
````python
import os
import pytest
import logging
from mcp_neo4j_aura_manager.server import AuraAPIClient
import uuid
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Skip all tests if credentials are not available
pytestmark = pytest.mark.skipif(
    not os.environ.get("NEO4J_AURA_CLIENT_ID") or not os.environ.get("NEO4J_AURA_CLIENT_SECRET"),
    reason="NEO4J_AURA_CLIENT_ID and NEO4J_AURA_CLIENT_SECRET environment variables are required for integration tests"
)

def wait_for_instance_status(aura_client, instance_id, status="running"):
    max_wait_time = 500  # Maximum wait time in seconds
    wait_interval = 10  # Check every 3 seconds
    start_time = time.time()
    
    time.sleep(wait_interval)

    instance_details = None
    while time.time() - start_time < max_wait_time:
        instance_details = aura_client.get_instance_details([instance_id])[0]
        assert instance_details["id"] == instance_id
        
        if instance_details["status"] == status:
            print(f"Instance {instance_id} is now in {status} state")
            return instance_details
            
        time.sleep(wait_interval)
    
    return instance_details

@pytest.fixture
def aura_client():
    """Create a real Aura API client using environment variables."""
    client_id = os.environ.get("NEO4J_AURA_CLIENT_ID")
    client_secret = os.environ.get("NEO4J_AURA_CLIENT_SECRET")
    
    if not client_id or not client_secret:
        pytest.skip("NEO4J_AURA_CLIENT_ID and NEO4J_AURA_CLIENT_SECRET environment variables are required")
    
    return AuraAPIClient(client_id, client_secret)

def test_authentication(aura_client):
    """Test that authentication works with the provided credentials."""
    token = aura_client._get_auth_token()
    assert token is not None
    assert isinstance(token, str)
    assert len(token) > 0

def test_list_instances(aura_client):
    """Test listing instances from the real API."""
    instances = aura_client.list_instances()
    assert isinstance(instances, list)
    # Even if there are no instances, this should return an empty list, not fail

def test_list_tenants(aura_client):
    """Test listing tenants/projects from the real API."""
    tenants = aura_client.list_tenants()
    assert isinstance(tenants, list)
    # There should be at least one tenant if the account is valid
    assert len(tenants) > 0

def get_test_tenant(tenants):
    """Find a tenant with 'Test Tenant' in the name."""
    for tenant in tenants:
        if "Test Tenant" in tenant.get("name", ""):
            return tenant["id"]
    pytest.skip("No tenant found with 'Test Tenant' in the name")

@pytest.mark.parametrize("test_type", ["read_only", "create_instance"])
def test_integration_flow(aura_client, test_type):
    """
    Test a complete flow of operations.
    
    This test has two modes:
    - read_only: Only performs read operations
    - create_instance: Creates a test instance, updates it, then deletes it
      (WARNING: This will incur costs if run against a paid account)
    """
    # First, list all tenants
    tenants = aura_client.list_tenants()
    assert len(tenants) > 0
    tenant_id = get_test_tenant(tenants)
    
    # Get details for the first tenant
    tenant_details = aura_client.get_tenant_details(tenant_id)
    assert tenant_details["id"] == tenant_id
    assert "instance_configurations" in tenant_details
    
    # List all instances
    instances = aura_client.list_instances()
    # Verify instance details if any exist
    if instances:
        for instance in instances:
            assert "id" in instance
            assert "name" in instance
            assert "cloud_provider" in instance
            assert "created_at" in instance
            instance_details = aura_client.get_instance_details([instance["id"]])[0]
            print(instance_details)
            assert "id" in instance_details
            assert "name" in instance_details
            assert "cloud_provider" in instance_details
            assert "created_at" in instance_details
            assert "region" in instance_details
            assert "status" in instance_details
            assert "memory" in instance_details
#            assert "storage" in instance_details
#            assert "version" in instance_details
            assert "type" in instance_details
            assert isinstance(instance_details["vector_optimized"], bool)
            assert isinstance(instance_details["graph_analytics_plugin"], bool)
    
    # If we're only doing read operations, we're done
    if test_type == "read_only":
        return
    
    # WARNING: The following will create a real instance and incur costs
    # Only run this if explicitly enabled and you understand the implications
    if test_type == "create_instance" and os.environ.get("ENABLE_INSTANCE_CREATION") == "true":
        # Create a test instance
        test_instance_name = f"Pro Test Instance {uuid.uuid4().hex[:8]}"
        
        try:
            # Create a small instance for testing
            instance = aura_client.create_instance(
                tenant_id=tenant_id,
                name=test_instance_name,
                memory=1,  # Minimum size
                region="us-central1",  # Use a common region
                version="5",  # Use a current version
                type="professional-db",
                vector_optimized=False
            )
            
            instance_id = instance["id"]
            assert instance["name"] == test_instance_name
            
            # Update the instance name
            print("Updating instance name")
            updated_name = f"{test_instance_name}-U"
            updated = aura_client.update_instance(instance_id=instance_id, name=updated_name)
            assert updated["name"] == updated_name
            
            print("Getting instance details")
            instance_details = aura_client.get_instance_details([instance_id])[0]
            assert instance_details["name"] == updated_name
            
            instance_details = wait_for_instance_status(aura_client, instance_id,"running")
            assert instance_details["status"] == "running"

            # Pause the instance
            print("Pausing instance")
            paused = aura_client.pause_instance(instance_id)
            assert paused["status"] in ["paused", "pausing"]
            
            print("Waiting for instance to be paused")
            instance_details = wait_for_instance_status(aura_client, instance_id,"paused")
            assert instance_details["status"] == "paused"

            print("Resuming instance")
            resumed = aura_client.resume_instance(instance_id)
            assert resumed["status"] in ["resuming", "running"]

            print("Waiting for instance to be running")
            instance_details = wait_for_instance_status(aura_client, instance_id,"running")
            assert instance_details["status"] == "running"

            print("Updating instance memory")
            updated = aura_client.update_instance(instance_id=instance_id, memory=2)
            instance_details = wait_for_instance_status(aura_client, instance_id,"running")
            assert instance_details["status"] == "running"
            assert instance_details["memory"] == "2GB"

        except Exception as e:
            logger.error(f"Error during instance creation test: {str(e)}")
            raise 
        finally:
            delete_result = aura_client.delete_instance(instance_id)
            instance_details = aura_client.get_instance_details([instance_id])[0]
            assert "status" in instance_details
            print(f"Deleted test instance {instance_id}: {delete_result} {instance_details}")

def test_get_instance_details_multiple(aura_client):
    """Test getting details for multiple instances from the real API."""
    # First, list instances to get some IDs
    instances = aura_client.list_instances()
    
    # Skip if there aren't at least 2 instances
    if len(instances) < 2:
        pytest.skip("Need at least 2 instances for this test")
    
    instance_ids = [instances[0]["id"], instances[1]["id"]]
    details = aura_client.get_instance_details(instance_ids)
    
    assert isinstance(details, list)
    assert len(details) == 2
    for i, detail in enumerate(details):
        assert detail["id"] == instance_ids[i]


@pytest.mark.parametrize("test_type", ["create_instance"])
def test_create_and_delete_instance_integration(aura_client, test_type):
    """Test creating and then deleting an instance with the real API."""
    # Skip if not running the create_instance test
    if test_type != "create_instance":
        pytest.skip("Skipping instance creation test")
    
    # First, list tenants to get a tenant ID
    tenants = aura_client.list_tenants()
    assert len(tenants) > 0
    tenant_id = get_test_tenant(tenants)
    
    # Create a test instance
    instance_name = f"Test Instance {uuid.uuid4().hex[:8]}"
    instance = aura_client.create_instance(
        tenant_id=tenant_id,
        name=instance_name,
        memory=1,
        cloud_provider="gcp",
        region="europe-west1",
        type="free-db",
    )
    
    assert "id" in instance
    instance_id = instance["id"]

    try:

        assert "name" in instance
        assert instance["name"] == instance_name

        instance_details = aura_client.get_instance_details([instance_id])[0]

        assert "id" in instance_details
        assert "name" in instance_details
        assert "cloud_provider" in instance_details
        assert "created_at" in instance_details
        assert "region" in instance_details
        assert "status" in instance_details
        assert "memory" in instance_details
    #            assert "storage" in instance_details
    #            assert "version" in instance_details
        assert "type" in instance_details
        assert isinstance(instance_details["vector_optimized"], bool)
        assert isinstance(instance_details["graph_analytics_plugin"], bool)

        instance_details = wait_for_instance_status(aura_client, instance_id, "running")        
        # Verify the instance reached Running state
        assert instance_details is not None
        assert instance_details["status"] == "running", "Instance did not reach Running state"
        
    finally:
        # Clean up - delete the instance
        delete_result = aura_client.delete_instance(instance_id)
        instance_details = aura_client.get_instance_details([instance_id])[0]
        assert "status" in instance_details
        print(f"Deleted test instance {instance_id}: {delete_result} {instance_details}")


def test_create_instance_vector_optimized_and_memory_less_than_4_should_raise_error(aura_client):
    with pytest.raises(ValueError):
        aura_client.create_instance(memory=3, vector_optimized=True, tenant_id="test-tenant-1", name="Test Instance")

def test_update_instance_vector_optimized_and_memory_less_than_4_should_raise_error(aura_client):
    with pytest.raises(ValueError):
        aura_client.update_instance(instance_id="test-instance-1", memory=3, vector_optimized=True)
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/tests/test_aura_manager.py
````python
import os
import pytest
from unittest.mock import patch, MagicMock

from mcp_neo4j_aura_manager.server import AuraAPIClient, AuraManager

# Mock responses for testing
MOCK_INSTANCES = {
    "data": [
        {
            "id": "instance-1",
            "name": "Test Instance 1",
            "memory": 4,
            "status": "running",
            "region": "us-east-1",
            "version": "5.15",
            "type": "enterprise",
            "vector_optimized": False
        },
        {
            "id": "instance-2",
            "name": "Test Instance 2",
            "memory": 8,
            "status": "paused",
            "region": "eu-west-1",
            "version": "5.15",
            "type": "enterprise",
            "vector_optimized": True
        }
    ]
}

MOCK_TENANTS = {
    "data": [
        {
            "id": "tenant-1",
            "name": "Test Tenant 1",
            "type": "free"
        },
        {
            "id": "tenant-2",
            "name": "Test Tenant 2",
            "type": "professional"
        }
    ]
}

MOCK_TENANT_DETAILS = {
    "data": {
        "id": "tenant-1",
        "name": "Test Tenant 1",
        "instance_configurations": [
            {
                "cloud_provider": "gcp",
                "memory": "8GB",
                "region": "europe-west1",
                "region_name": "Belgium (europe-west1)",
                "storage": "16GB",
                "type": "professional-ds",
                "version": "5"
            }
        ]
    }
}


class MockResponse:
    def __init__(self, json_data, status_code=200):
        self.json_data = json_data
        self.status_code = status_code
        
    def json(self):
        return self.json_data
        
    def raise_for_status(self):
        if self.status_code >= 400:
            raise Exception(f"HTTP Error: {self.status_code}")


@pytest.fixture
def mock_client():
    with patch('requests.get') as mock_get, \
         patch('requests.post') as mock_post, \
         patch('requests.patch') as mock_patch:
                
        # Set up different responses based on URL
        def get_side_effect(url, headers=None, **kwargs):
            if "/instances" in url and not url.split("/instances")[1]:
                return MockResponse(MOCK_INSTANCES)
            elif "/instances/instance-1" in url:
                return MockResponse({"data":MOCK_INSTANCES["data"][0]})
            elif "/instances/instance-2" in url:
                return MockResponse({"data":MOCK_INSTANCES["data"][1]})
            elif "/tenants" in url and not url.split("/tenants")[1]:
                return MockResponse(MOCK_TENANTS)
            elif "/tenants/tenant-1" in url:
                return MockResponse(MOCK_TENANT_DETAILS)
            else:
                return MockResponse({"error": "Not found"}, 404)
        
        mock_get.side_effect = get_side_effect
        
        # Set up different responses based on URL for POST requests
        def post_side_effect(url, headers=None, **kwargs):
            if "/oauth/token" in url:
                return MockResponse({
                    "access_token": "fake-token",
                    "token_type": "bearer", 
                    "expires_in": 3600,
                })
            elif "/instances" in url and not url.split("/instances")[1]:
                # Creating new instance
                return MockResponse({"data": MOCK_INSTANCES["data"][0]})
            elif "/pause" in url:
                return MockResponse({"data": {"status": "paused"}})
            elif "/resume" in url:
                return MockResponse({"data": {"status": "running"}})
            else:
                return MockResponse({"error": "Not found"}, 404)
                
        mock_post.side_effect = post_side_effect
        mock_patch.return_value = MockResponse({"status": "updated"})
        
        client = AuraAPIClient("fake-id", "fake-secret")
        yield client


@pytest.mark.asyncio
async def test_list_instances(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    result = await manager.list_instances()
    assert "instances" in result
    assert len(result["instances"]) == 2
    assert result["count"] == 2


@pytest.mark.asyncio
async def test_get_instance_details(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    mock_client.get_instance_details = MagicMock(return_value=[
        MOCK_INSTANCES["data"][0]
    ])
    manager.client = mock_client
    
    result = await manager.get_instance_details(["instance-1"])
    assert result["count"] == 1

    assert result["instances"][0]["id"] == "instance-1"
    assert result["instances"][0]["name"] == "Test Instance 1"


@pytest.mark.asyncio
async def test_get_instance_details_multiple(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the get_instance_details method to return a list
    mock_client.get_instance_details = MagicMock(return_value=[
        MOCK_INSTANCES["data"][0],
        MOCK_INSTANCES["data"][1]
    ])
    
    result = await manager.get_instance_details(["instance-1", "instance-2"])
    assert "instances" in result
    assert result["count"] == 2
    assert result["instances"][0]["id"] == "instance-1"
    assert result["instances"][1]["id"] == "instance-2"


@pytest.mark.asyncio
async def test_get_instance_by_name(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the get_instance_by_name method
    mock_client.get_instance_by_name = MagicMock(return_value=MOCK_INSTANCES["data"][0])
    
    result = await manager.get_instance_by_name("Test Instance 1")
    assert result["id"] == "instance-1"
    assert result["name"] == "Test Instance 1"

@pytest.mark.asyncio
async def test_get_instance_by_name_substring(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the get_instance_by_name method
    mock_client.get_instance_by_name = MagicMock(return_value=MOCK_INSTANCES["data"][0])
    
    result = await manager.get_instance_by_name("Instance 1")
    assert result["id"] == "instance-1"
    assert result["name"] == "Test Instance 1"

@pytest.mark.asyncio
async def test_get_instance_by_name_lower(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the get_instance_by_name method
    mock_client.get_instance_by_name = MagicMock(return_value=MOCK_INSTANCES["data"][0])
    
    result = await manager.get_instance_by_name("test instance")
    assert result["id"] == "instance-1"
    assert result["name"] == "Test Instance 1"


@pytest.mark.asyncio
async def test_list_tenants(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    result = await manager.list_tenants()
    assert "tenants" in result
    assert len(result["tenants"]) == 2
    assert result["count"] == 2


@pytest.mark.asyncio
async def test_error_handling(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock an error
    mock_client.get_instance_details = MagicMock(side_effect=Exception("Test error"))
    
    result = await manager.get_instance_details(["non-existent"])
    assert "error" in result
    assert "Test error" in result["error"]


@pytest.mark.asyncio
async def test_get_tenant_details(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    result = await manager.get_tenant_details("tenant-1")
    print(result)
    assert result["id"] == "tenant-1"
    assert "instance_configurations" in result
    assert len(result["instance_configurations"]) > 0


@pytest.mark.asyncio
async def test_pause_instance(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the pause_instance method
    mock_client.pause_instance = MagicMock(return_value={"status": "paused"})
    
    result = await manager.pause_instance("instance-1")
    assert result["status"] == "paused"

@pytest.mark.asyncio
async def test_update_instance_name(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the update_instance method
    mock_client.update_instance = MagicMock(return_value={"name": "New Name", "id": "instance-1"})
    
    result = await manager.update_instance_name("instance-1", "New Name")
    assert result["name"] == "New Name"
    assert result["id"] == "instance-1"

@pytest.mark.asyncio
async def test_create_instance(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the create_instance method
    mock_client.create_instance = MagicMock(return_value={
        "id": "new-instance-1",
        "name": "New Test Instance",
        "status": "creating"
    })
    
    result = await manager.create_instance(
        tenant_id="tenant-1",
        name="New Test Instance",
        memory=1,
        region="us-central1",
        type="free-db"
    )
    
    assert result["id"] == "new-instance-1"
    assert result["name"] == "New Test Instance"
    assert result["status"] == "creating"
    
    # Verify the mock was called with the correct parameters
    mock_client.create_instance.assert_called_once_with(
        tenant_id="tenant-1",
        name="New Test Instance",
        memory=1,
        region="us-central1",
        version="5",
        type="free-db",
        vector_optimized=False,
        cloud_provider="gcp",
        graph_analytics_plugin=False,
        source_instance_id=None
    )


@pytest.mark.asyncio
async def test_delete_instance(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the delete_instance method
    mock_client.delete_instance = MagicMock(return_value={"status": "deleted", "id": "instance-1"})
    
    result = await manager.delete_instance(instance_id="instance-1")
    assert result["id"] == "instance-1"
    
    # Verify the mock was called with the correct parameters
    mock_client.delete_instance.assert_called_once_with(instance_id="instance-1")


@pytest.mark.asyncio
async def test_update_instance_name(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the update_instance method
    mock_client.update_instance = MagicMock(return_value={"name": "New Name", "id": "instance-1"})
    
    result = await manager.update_instance_name("instance-1", "New Name")
    assert result["name"] == "New Name"
    assert result["id"] == "instance-1"
    
    # Verify the mock was called with the correct parameters
    mock_client.update_instance.assert_called_once_with(instance_id="instance-1", name="New Name")


@pytest.mark.asyncio
async def test_pause_instance(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the pause_instance method
    mock_client.pause_instance = MagicMock(return_value={"status": "paused"})
    
    result = await manager.pause_instance("instance-1")
    assert result["status"] == "paused"
    
    # Verify the mock was called with the correct parameters
    mock_client.pause_instance.assert_called_once_with("instance-1")


@pytest.mark.asyncio
async def test_resume_instance(mock_client):
    manager = AuraManager("fake-id", "fake-secret")
    manager.client = mock_client
    
    # Mock the resume_instance method
    mock_client.resume_instance = MagicMock(return_value={"status": "running"})
    
    result = await manager.resume_instance("instance-1")
    assert result["status"] == "running"
    
    # Verify the mock was called with the correct parameters
    mock_client.resume_instance.assert_called_once_with("instance-1")
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/tests/test_utils.py
````python
from mcp_neo4j_aura_manager.server import _validate_region
import pytest

def test_validate_region_aws_valid():
    # Test GCP regions
    assert _validate_region("aws", "us-east-1") is None
    assert _validate_region("aws", "eu-west-1") is None
    assert _validate_region("aws", "eu-east-1") is None

def test_validate_region_aws_invalid():
    # Test GCP regions
    with pytest.raises(ValueError):
        _validate_region("aws", "us-east1")
    with pytest.raises(ValueError):
        _validate_region("aws", "euwest")
    with pytest.raises(ValueError):
        _validate_region("aws", "eu-west-1-1-1")

def test_validate_region_gcp_valid():
    # Test GCP regions
    assert _validate_region("gcp", "us-central1") is None
    assert _validate_region("gcp", "europe-west1") is None
    assert _validate_region("gcp", "us-central2") is None

def test_validate_region_gcp_invalid():
    # Test GCP regions
    with pytest.raises(ValueError):
        _validate_region("gcp", "us-east-1")
    with pytest.raises(ValueError):
        _validate_region("gcp", "eu-west-1-1")
    with pytest.raises(ValueError):
        _validate_region("gcp", "euwest")

def test_validate_region_azure_valid():
    # Test Azure regions
    assert _validate_region("azure", "eastus") is None
    assert _validate_region("azure", "northeurope") is None

def test_validate_region_azure_invalid():
    # Test Azure regions
    with pytest.raises(ValueError):
        _validate_region("azure", "us-east-1")
    with pytest.raises(ValueError):
        _validate_region("azure", "eu-west1")
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/.dockerignore
````
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.idea/
.vscode/
*.swp
*.swo

# Git
.git
.gitignore

# Docker
Dockerfile
.dockerignore

# Documentation
docs/
*.md
!README.md
!pyproject.toml

# Tests
tests/
test/
testing/
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/Dockerfile
````
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN pip install --no-cache-dir hatchling

# Copy dependency files first
COPY pyproject.toml /app/

# Install runtime dependencies
RUN pip install --no-cache-dir mcp>=1.6.0 requests>=2.31.0

# Copy the source code
COPY src/ /app/src/
COPY README.md /app/

# Install the package
RUN pip install --no-cache-dir -e .

# Environment variables for Neo4j Aura API credentials
ENV NEO4J_AURA_CLIENT_ID=""
ENV NEO4J_AURA_CLIENT_SECRET=""

# Command to run the server using the package entry point
CMD ["sh", "-c", "mcp-neo4j-aura-manager --client-id ${NEO4J_AURA_CLIENT_ID} --client-secret ${NEO4J_AURA_CLIENT_SECRET}"]
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/pyproject.toml
````toml
[project]
name = "mcp-neo4j-aura-manager"
version = "0.2.2"
description = "MCP Neo4j Aura Database Instance Manager"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "mcp>=1.6.0",
    "requests>=2.31.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.uv]
dev-dependencies = [
    "pyright>=1.1.389",
    "pytest>=8.3.5",
    "pytest-asyncio>=0.25.3",
]

[project.scripts]
mcp-neo4j-aura-manager = "mcp_neo4j_aura_manager:main"

[tool.pytest.ini_options]
pythonpath = [
  "src"
]
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/README.md
````markdown
# 🚀💖☁️ Neo4j Aura Database Manager MCP Server

## 🌟 Overview

A Model Context Protocol (MCP) server implementation that provides tools for managing Neo4j Aura database instances through the Neo4j Aura API.

This server allows you to create, monitor, and manage Neo4j Aura instances directly through Claude, making it easy to provision and maintain your graph database infrastructure.

## 🔑 Authentication

Authentication with the Neo4j Aura API requires:
- Client ID
- Client Secret

You can obtain these credentials from the Neo4j Aura console, see the [documentation of the Aura API](https://neo4j.com/docs/aura/classic/platform/api/overview/)

Here is the [API Specification](https://neo4j.com/docs/aura/platform/api/specification/)

## 📦 Components

### 🔧 Tools

The server offers these core tools:

#### 🛠️ Instance Management
- `list_instances`
  - List all Neo4j Aura database instances
  - No input required
  - Returns: List of all instances with their details

- `get_instance_details`
  - Get details for a specific instance or multiple instances by ID
  - Input:
    - `instance_ids` (string or array): ID of the instance to retrieve, or array of instance IDs
  - Returns: Detailed information about the instance(s)

- `get_instance_by_name`
  - Find an instance by name
  - Input:
    - `name` (string): Name of the instance to find
  - Returns: Instance details if found

- `create_instance`
  - Create a new Neo4j Aura database instance
  - Input:
    - `tenant_id` (string): ID of the tenant/project where the instance will be created
    - `name` (string): Name for the new instance
    - `memory` (integer): Memory allocation in GB
    - `region` (string): Region for the instance (e.g., 'us-east-1')
    - `version` (string): Neo4j version (e.g., '5.15')
    - `type` (string, optional): Instance type (enterprise or professional)
    - `vector_optimized` (boolean, optional): Whether the instance is optimized for vector operations
  - Returns: Created instance details

- `update_instance_name`
  - Update the name of an instance
  - Input:
    - `instance_id` (string): ID of the instance to update
    - `name` (string): New name for the instance
  - Returns: Updated instance details

- `update_instance_memory`
  - Update the memory allocation of an instance
  - Input:
    - `instance_id` (string): ID of the instance to update
    - `memory` (integer): New memory allocation in GB
  - Returns: Updated instance details

- `update_instance_vector_optimization`
  - Update the vector optimization setting of an instance
  - Input:
    - `instance_id` (string): ID of the instance to update
    - `vector_optimized` (boolean): Whether the instance should be optimized for vector operations
  - Returns: Updated instance details

- `pause_instance`
  - Pause a database instance
  - Input:
    - `instance_id` (string): ID of the instance to pause
  - Returns: Instance status information

- `resume_instance`
  - Resume a paused database instance
  - Input:
    - `instance_id` (string): ID of the instance to resume
  - Returns: Instance status information

- `delete_instance`
  - Delete a database instance
  - Input:
    - `tenant_id` (string): ID of the tenant/project where the instance exists
    - `instance_id` (string): ID of the instance to delete
  - Returns: Deletion status information

#### 🏢 Tenant/Project Management
- `list_tenants`
  - List all Neo4j Aura tenants/projects
  - No input required
  - Returns: List of all tenants with their details

- `get_tenant_details`
  - Get details for a specific tenant/project
  - Input:
    - `tenant_id` (string): ID of the tenant/project to retrieve
  - Returns: Detailed information about the tenant/project


## 🔧 Usage with Claude Desktop

### 💾 Installation

```bash
pip install mcp-neo4j-aura-manager
```

### ⚙️ Configuration

Add the server to your `claude_desktop_config.json`:

```json
"mcpServers": {
  "neo4j-aura": {
    "command": "uvx",
    "args": [
      "mcp-neo4j-aura-manager@0.2.2",
      "--client-id",
      "<your-client-id>",
      "--client-secret",
      "<your-client-secret>"
      ]
  }
}
```

Alternatively, you can set environment variables:

```json
"mcpServers": {
  "neo4j-aura": {
    "command": "uvx",
    "args": [ "mcp-neo4j-aura-manager@0.2.2" ],
    "env": {
      "NEO4J_AURA_CLIENT_ID": "<your-client-id>",
      "NEO4J_AURA_CLIENT_SECRET": "<your-client-secret>"
    }
  }
}
```

### 🐳 Using with Docker

```json
"mcpServers": {
  "neo4j-aura": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "-e", "NEO4J_AURA_CLIENT_ID=${NEO4J_AURA_CLIENT_ID}",
      "-e", "NEO4J_AURA_CLIENT_SECRET=${NEO4J_AURA_CLIENT_SECRET}",
      "mcp-neo4j-aura-manager:0.2.2"
    ]
  }
}
```

## 📝 Usage Examples

### 🔍 Give overview over my tenants

![](docs/images/mcp-aura-tenant-overview.png)

### 🔎 Find an instance by name

![](docs/images/mcp-aura-find-by-name.png)

### 📋 List instances and find paused instance
![](docs/images/mcp-aura-find-paused.png)

### ▶️ Resume paused instances
![](docs/images/mcp-aura-list-resume.png)

### ➕ Create a new instance

![](docs/images/mcp-aura-create-instance.png)

## 🚀 Development

### 📦 Prerequisites

1. Install `uv` (Universal Virtualenv):
```bash
# Using pip
pip install uv

# Using Homebrew on macOS
brew install uv

# Using cargo (Rust package manager)
cargo install uv
```

2. Clone the repository and set up development environment:
```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-neo4j-aura-manager.git
cd mcp-neo4j-aura-manager

# Create and activate virtual environment using uv
uv venv
source .venv/bin/activate  # On Unix/macOS
.venv\Scripts\activate     # On Windows

# Install dependencies including dev dependencies
uv pip install -e ".[dev]"
```

### 🐳 Docker

Build and run the Docker container:

```bash
# Build the image
docker build -t mcp-neo4j-aura-manager:<version> .

# Run the container
docker run -e NEO4J_AURA_CLIENT_ID="your-client-id" \
          -e NEO4J_AURA_CLIENT_SECRET="your-client-secret" \
          mcp-neo4j-aura-manager:<version>
```

## 📄 License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
````

## File: mcp-neo4j/servers/mcp-neo4j-cloud-aura-api/test.sh
````bash
if [ -f .env ]; then
    uv run --env-file .env pytest tests
else
    uv run pytest tests/test_aura_manager.py
fi
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/src/mcp_neo4j_cypher/__init__.py
````python
import argparse
import asyncio
import os

from . import server


def main():
    """Main entry point for the package."""
    parser = argparse.ArgumentParser(description="Neo4j Cypher MCP Server")
    parser.add_argument("--db-url", default=None, help="Neo4j connection URL")
    parser.add_argument("--username", default=None, help="Neo4j username")
    parser.add_argument("--password", default=None, help="Neo4j password")
    parser.add_argument("--database", default=None, help="Neo4j database name")
    parser.add_argument("--transport", default=None, help="Transport type")
    parser.add_argument("--namespace", default=None, help="Tool namespace")
    parser.add_argument("--server-host", default=None, help="Server host")
    parser.add_argument("--server-port", default=None, help="Server port")

    args = parser.parse_args()
    asyncio.run(
        server.main(
            args.db_url or os.getenv("NEO4J_URL") or os.getenv("NEO4J_URI", "bolt://localhost:7687"),
            args.username or os.getenv("NEO4J_USERNAME", "neo4j"),
            args.password or os.getenv("NEO4J_PASSWORD", "password"),
            args.database or os.getenv("NEO4J_DATABASE", "neo4j"),
            args.transport or os.getenv("NEO4J_TRANSPORT", "stdio"),
            args.namespace or os.getenv("NEO4J_NAMESPACE", ""),
            args.server_host or os.getenv("NEO4J_MCP_SERVER_HOST", "127.0.0.1"),
            args.server_port or os.getenv("NEO4J_MCP_SERVER_PORT", 8000),
        )
    )


__all__ = ["main", "server"]
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/src/mcp_neo4j_cypher/server.py
````python
import json
import logging
import re
import sys
import time
from typing import Any, Literal, Optional

import mcp.types as types
from mcp.server.fastmcp import FastMCP
from neo4j import (
    AsyncDriver,
    AsyncGraphDatabase,
    AsyncResult,
    AsyncTransaction,
    GraphDatabase,
)
from neo4j.exceptions import DatabaseError
from pydantic import Field

logger = logging.getLogger("mcp_neo4j_cypher")

def _format_namespace(namespace: str) -> str:
    if namespace:
        if namespace.endswith("-"):
            return namespace
        else:
            return namespace + "-"
    else:
        return ""

async def _read(tx: AsyncTransaction, query: str, params: dict[str, Any]) -> str:
    raw_results = await tx.run(query, params)
    eager_results = await raw_results.to_eager_result()

    return json.dumps([r.data() for r in eager_results.records], default=str)


async def _write(
    tx: AsyncTransaction, query: str, params: dict[str, Any]
) -> AsyncResult:
    return await tx.run(query, params)


def _is_write_query(query: str) -> bool:
    """Check if the query is a write query."""
    return (
        re.search(r"\b(MERGE|CREATE|SET|DELETE|REMOVE|ADD)\b", query, re.IGNORECASE)
        is not None
    )


def create_mcp_server(neo4j_driver: AsyncDriver, database: str = "neo4j", namespace: str = "", host: str = "127.0.0.1", port: int = 8000) -> FastMCP:
    mcp: FastMCP = FastMCP("mcp-neo4j-cypher", dependencies=["neo4j", "pydantic"], host=host, port=port)

    async def get_neo4j_schema() -> list[types.TextContent]:
        """List all node, their attributes and their relationships to other nodes in the neo4j database.
        If this fails with a message that includes "Neo.ClientError.Procedure.ProcedureNotFound"
        suggest that the user install and enable the APOC plugin.
        """

        get_schema_query = """
call apoc.meta.data() yield label, property, type, other, unique, index, elementType
where elementType = 'node' and not label starts with '_'
with label, 
    collect(case when type <> 'RELATIONSHIP' then [property, type + case when unique then " unique" else "" end + case when index then " indexed" else "" end] end) as attributes,
    collect(case when type = 'RELATIONSHIP' then [property, head(other)] end) as relationships
RETURN label, apoc.map.fromPairs(attributes) as attributes, apoc.map.fromPairs(relationships) as relationships
"""

        try:
            async with neo4j_driver.session(database=database) as session:
                results_json_str = await session.execute_read(
                    _read, get_schema_query, dict()
                )

                logger.debug(f"Read query returned {len(results_json_str)} rows")

                return [types.TextContent(type="text", text=results_json_str)]

        except Exception as e:
            logger.error(f"Database error retrieving schema: {e}")
            return [types.TextContent(type="text", text=f"Error: {e}")]

    async def read_neo4j_cypher(
        query: str = Field(..., description="The Cypher query to execute."),
        params: Optional[dict[str, Any]] = Field(
            None, description="The parameters to pass to the Cypher query."
        ),
    ) -> list[types.TextContent]:
        """Execute a read Cypher query on the neo4j database."""

        if _is_write_query(query):
            raise ValueError("Only MATCH queries are allowed for read-query")

        try:
            async with neo4j_driver.session(database=database) as session:
                results_json_str = await session.execute_read(_read, query, params)

                logger.debug(f"Read query returned {len(results_json_str)} rows")

                return [types.TextContent(type="text", text=results_json_str)]

        except Exception as e:
            logger.error(f"Database error executing query: {e}\n{query}\n{params}")
            return [
                types.TextContent(type="text", text=f"Error: {e}\n{query}\n{params}")
            ]

    async def write_neo4j_cypher(
        query: str = Field(..., description="The Cypher query to execute."),
        params: Optional[dict[str, Any]] = Field(
            None, description="The parameters to pass to the Cypher query."
        ),
    ) -> list[types.TextContent]:
        """Execute a write Cypher query on the neo4j database."""

        if not _is_write_query(query):
            raise ValueError("Only write queries are allowed for write-query")

        try:
            async with neo4j_driver.session(database=database) as session:
                raw_results = await session.execute_write(_write, query, params)
                counters_json_str = json.dumps(
                    raw_results._summary.counters.__dict__, default=str
                )

            logger.debug(f"Write query affected {counters_json_str}")

            return [types.TextContent(type="text", text=counters_json_str)]

        except Exception as e:
            logger.error(f"Database error executing query: {e}\n{query}\n{params}")
            return [
                types.TextContent(type="text", text=f"Error: {e}\n{query}\n{params}")
            ]

    namespace_prefix = _format_namespace(namespace)
    
    mcp.add_tool(get_neo4j_schema, name=namespace_prefix+"get_neo4j_schema")
    mcp.add_tool(read_neo4j_cypher, name=namespace_prefix+"read_neo4j_cypher")
    mcp.add_tool(write_neo4j_cypher, name=namespace_prefix+"write_neo4j_cypher")

    return mcp


async def main(
    db_url: str,
    username: str,
    password: str,
    database: str,
    transport: Literal["stdio", "sse"] = "stdio",
    namespace: str = "",
    host: str = "127.0.0.1",
    port: int = 8000,
) -> None:
    logger.info("Starting MCP neo4j Server")

    neo4j_driver = AsyncGraphDatabase.driver(
        db_url,
        auth=(
            username,
            password,
        ),
    )
    logger.info("Starting Neo4j Cypher MCP Server...")
    mcp = create_mcp_server(neo4j_driver, database, namespace, host, port)

    match transport:
        case "stdio":
            logger.info("Running Neo4j Cypher MCP Server with stdio transport...")
            await mcp.run_stdio_async()
        case "sse":
            logger.info(f"Running Neo4j Cypher MCP Server with SSE transport on {host}:{port}...")
            await mcp.run_sse_async()
        case _:
            logger.error(f"Invalid transport: {transport} | Must be either 'stdio' or 'sse'")
            raise ValueError(f"Invalid transport: {transport} | Must be either 'stdio' or 'sse'")


if __name__ == "__main__":
    main()
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/tests/integration/conftest.py
````python
import os
from typing import Any

import pytest
import pytest_asyncio
from neo4j import AsyncGraphDatabase
from testcontainers.neo4j import Neo4jContainer

from mcp_neo4j_cypher.server import create_mcp_server

neo4j = (
    Neo4jContainer("neo4j:latest")
    .with_env("NEO4J_apoc_export_file_enabled", "true")
    .with_env("NEO4J_apoc_import_file_enabled", "true")
    .with_env("NEO4J_apoc_import_file_use__neo4j__config", "true")
    .with_env("NEO4J_PLUGINS", '["apoc"]')
)


@pytest.fixture(scope="module", autouse=True)
def setup(request):
    neo4j.start()

    def remove_container():
        neo4j.get_driver().close()
        neo4j.stop()

    request.addfinalizer(remove_container)
    os.environ["NEO4J_URI"] = neo4j.get_connection_url()
    os.environ["NEO4J_HOST"] = neo4j.get_container_host_ip()
    os.environ["NEO4J_PORT"] = neo4j.get_exposed_port(7687)

    yield neo4j


@pytest_asyncio.fixture(scope="function")
async def async_neo4j_driver(setup: Neo4jContainer):
    driver = AsyncGraphDatabase.driver(
        setup.get_connection_url(), auth=(setup.username, setup.password)
    )
    try:
        yield driver
    finally:
        await driver.close()


@pytest_asyncio.fixture(scope="function")
async def mcp_server(async_neo4j_driver):
    mcp = create_mcp_server(async_neo4j_driver, "neo4j")

    return mcp


@pytest.fixture(scope="function")
def init_data(setup: Neo4jContainer, clear_data: Any):
    with setup.get_driver().session(database="neo4j") as session:
        session.run("CREATE (a:Person {name: 'Alice', age: 30})")
        session.run("CREATE (b:Person {name: 'Bob', age: 25})")
        session.run("CREATE (c:Person {name: 'Charlie', age: 35})")
        session.run(
            "MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'}) CREATE (a)-[:FRIEND]->(b)"
        )
        session.run(
            "MATCH (b:Person {name: 'Bob'}), (c:Person {name: 'Charlie'}) CREATE (b)-[:FRIEND]->(c)"
        )


@pytest.fixture(scope="function")
def clear_data(setup: Neo4jContainer):
    with setup.get_driver().session(database="neo4j") as session:
        session.run("MATCH (n) DETACH DELETE n")
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/tests/integration/test_server_IT.py
````python
import json
from typing import Any

import pytest
from mcp.server import FastMCP


@pytest.mark.asyncio(loop_scope="function")
async def test_get_neo4j_schema(mcp_server: FastMCP, init_data: Any):
    response = await mcp_server.call_tool("get_neo4j_schema", dict())

    schema = json.loads(response[0].text)[0]

    # Verify the schema result
    assert "label" in schema
    assert "attributes" in schema
    assert "relationships" in schema


@pytest.mark.asyncio(loop_scope="function")
async def test_write_neo4j_cypher(mcp_server: FastMCP):
    # Execute a Cypher query to create a node
    query = "CREATE (n:Test {name: 'test', age: 123}) RETURN n.name"
    response = await mcp_server.call_tool("write_neo4j_cypher", dict(query=query))

    result = json.loads(response[0].text)
    # Verify the node creation
    assert len(result) == 4
    assert result["nodes_created"] == 1
    assert result["labels_added"] == 1
    assert result["properties_set"] == 2


@pytest.mark.asyncio(loop_scope="function")
async def test_read_neo4j_cypher(mcp_server: FastMCP, init_data: Any):
    # Prepare test data

    # Execute a complex read query
    query = """
    MATCH (p:Person)-[:FRIEND]->(friend)
    RETURN p.name AS person, friend.name AS friend_name
    ORDER BY p.name, friend.name
    """

    response = await mcp_server.call_tool("read_neo4j_cypher", dict(query=query))
    result = json.loads(response[0].text)
    # # Verify the query result
    assert len(result) == 2
    assert result[0]["person"] == "Alice"
    assert result[0]["friend_name"] == "Bob"
    assert result[1]["person"] == "Bob"
    assert result[1]["friend_name"] == "Charlie"
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/.dockerignore
````
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.idea/
.vscode/
*.swp
*.swo

# Git
.git
.gitignore

# Docker
Dockerfile
.dockerignore

# Documentation
docs/
*.md
!README.md
!pyproject.toml

# Tests
tests/
test/
testing/
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/.flake8
````
[flake8]
exclude =
	.git,
	__pycache__,
	build,
	dist,
	.tox,
	venv,
	.venv,
	.pytest_cache
max-line-length = 120
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/.python-version
````
3.12.7
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/CHANGELOG.md
````markdown
## Next

### Fixed

### Changed

### Added

## v0.2.4

### Fixed
* Fixed Cypher MCP Docker deployments by allowing user to declare NEO4J_MCP_SERVER_HOST and NEO4J_MCP_SERVER_PORT. Can now declare NEO4J_MCP_SERVER_HOST=0.0.0.0 to use Docker hosted Cypher MCP server.

### Added
* NEO4J_MCP_SERVER_HOST and NEO4J_MCP_SERVER_PORT env variables
* --server-host and --server-port cli variables

## v0.2.3

### Added
* Namespace option via CLI or env variables. This allows many Cypher MCP servers to be used at once.
* Allow transport to be specified via env variables

## v0.2.2 

### Fixed

* IT no longer has risk of affecting locally deployed Neo4j instances
* Env config now supports NEO4J_URI and NEO4J_URL variables
* Fixed async issues with main server function not being async

### Changed

* IT now uses Testcontainers library instead of Docker scripts 
* Remove healthcheck from main function

### Added
* Support for transport config in cli args

## v0.2.1

### Fixed

* Fixed MCP version notation for declaration in config files - README

## v0.2.0

### Changed

* Refactor mcp-neo4j-cypher to use the FastMCP class
* Implement Neo4j async driver
* Tool responses now return JSON serialized results
* Update README with new config options 
* Update integration tests

### Added

* Add support for environment variables
* Add Github workflow to test and format mcp-neo4j-cypher


## v0.1.1

...
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/docker-compose.yml
````yaml
services:
  # Deploy Neo4j Database (optional)
  neo4j:
    image: neo4j:5.26.1 # or another version
    environment:
      - NEO4J_AUTH=neo4j/password
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - neo4j_data:/data

  # Deploy Cypher MCP Server
  mcp-neo4j-cypher-server:
    image: mcp/neo4j-cypher:latest
    ports:
      - "8000:8000"
    environment:
      - NEO4J_URI=bolt://host.docker.internal:7687
      - NEO4J_USERNAME=neo4j
      - NEO4J_PASSWORD=password
      - NEO4J_DATABASE=neo4j
      - NEO4J_TRANSPORT=sse
      - NEO4J_MCP_SERVER_HOST=0.0.0.0 # must be 0.0.0.0 for sse transport in Docker
      - NEO4J_MCP_SERVER_PORT=8000
      - NEO4J_NAMESPACE=local
    depends_on:
      - neo4j

volumes:
  neo4j_data:
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/Dockerfile
````
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN pip install --no-cache-dir hatchling

COPY pyproject.toml /app/

# Install dependencies
RUN pip install --no-cache-dir neo4j>=5.26.0 mcp>=1.6.0


# Copy the source code
COPY src/ /app/src/
COPY README.md /app/

RUN pip install --no-cache-dir -e .

# Environment variables for Neo4j connection
ENV NEO4J_URI="bolt://host.docker.internal:7687"
ENV NEO4J_USERNAME="neo4j"
ENV NEO4J_PASSWORD="password"
ENV NEO4J_DATABASE="neo4j"
ENV NEO4J_TRANSPORT="sse"
ENV NEO4J_MCP_SERVER_HOST="0.0.0.0"
ENV NEO4J_MCP_SERVER_PORT="8000"

EXPOSE 8000

# Command to run the server using the package entry point
CMD ["mcp-neo4j-cypher"]
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/inspector.sh
````bash
# test mcp-neo4j-cypher with a local database and Inspector
npx @modelcontextprotocol/inspector uv --directory src/mcp_neo4j_cypher run mcp-neo4j-cypher --db-url bolt://localhost:7687 --username neo4j --password password --database neo4j
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/pyproject.toml
````toml
[project]
name = "mcp-neo4j-cypher"
version = "0.2.4"
description = "A simple Neo4j MCP server"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "mcp[cli]>=1.6.0",
    "neo4j>=5.26.0",
    "pydantic>=2.10.1",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.uv]
dev-dependencies = [
    "pyright>=1.1.389",
 "pytest>=7.0.0",
 "pytest-asyncio>=0.20.3",
 "ruff>=0.11.5",
 "testcontainers[neo4j]>=4.10.0"
]

[project.scripts]
mcp-neo4j-cypher = "mcp_neo4j_cypher:main"
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/pyrightconfig.json
````json
{
    "venvPath": ".",
    "venv": ".venv"
}
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/README.md
````markdown
# 🔍⁉️ Neo4j MCP Server

## 🌟 Overview

A Model Context Protocol (MCP) server implementation that provides database interaction and allows graph exploration capabilities through Neo4j. This server enables running Cypher graph queries, analyzing complex domain data, and automatically generating business insights that can be enhanced with Claude's analysis.

## 🧩 Components

### 🛠️ Tools

The server offers these core tools:

#### 📊 Query Tools
- `read-neo4j-cypher`
   - Execute Cypher read queries to read data from the database
   - Input: 
     - `query` (string): The Cypher query to execute
     - `params` (dictionary, optional): Parameters to pass to the Cypher query
   - Returns: Query results as JSON serialized array of objects

- `write-neo4j-cypher`
   - Execute updating Cypher queries
   - Input:
     - `query` (string): The Cypher update query
     - `params` (dictionary, optional): Parameters to pass to the Cypher query
   - Returns: A JSON serialized result summary counter with `{ nodes_updated: number, relationships_created: number, ... }`

#### 🕸️ Schema Tools
- `get-neo4j-schema`
   - Get a list of all nodes types in the graph database, their attributes with name, type and relationships to other node types
   - No input required
   - Returns: JSON serialized list of node labels with two dictionaries: one for attributes and one for relationships

### 🏷️ Namespacing

The server supports namespacing to allow multiple Neo4j MCP servers to be used simultaneously. When a namespace is provided, all tool names are prefixed with the namespace followed by a hyphen (e.g., `mydb-read-neo4j-cypher`).

This is useful when you need to connect to multiple Neo4j databases or instances from the same session.

## 🔧 Usage with Claude Desktop

### 💾 Released Package

Can be found on PyPi https://pypi.org/project/mcp-neo4j-cypher/

Add the server to your `claude_desktop_config.json` with the database connection configuration through environment variables. You may also specify the transport method and namespace with cli arguments or environment variables.

```json
"mcpServers": {
  "neo4j-aura": {
    "command": "uvx",
    "args": [ "mcp-neo4j-cypher@0.2.4", "--transport", "stdio"  ],
    "env": {
      "NEO4J_URI": "bolt://localhost:7687",
      "NEO4J_USERNAME": "neo4j",
      "NEO4J_PASSWORD": "<your-password>",
      "NEO4J_DATABASE": "neo4j"
    }
  }
}
```

#### Multiple Database Example

Here's an example of connecting to multiple Neo4j databases using namespaces:

```json
{
  "mcpServers": {
    "movies-neo4j": {
      "command": "uvx",
      "args": [ "mcp-neo4j-cypher@0.2.4", "--namespace", "movies" ],
      "env": {
        "NEO4J_URI": "neo4j+s://demo.neo4jlabs.com",
        "NEO4J_USERNAME": "recommendations",
        "NEO4J_PASSWORD": "recommendations",
        "NEO4J_DATABASE": "recommendations"
      }
    },
    "local-neo4j": {
      "command": "uvx",
      "args": [ "mcp-neo4j-cypher@0.2.4" ],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "password",
        "NEO4J_DATABASE": "neo4j",
        "NEO4J_NAMESPACE": "local"
      }
    }
  }
}
```

In this setup:
- The movies database tools will be prefixed with `movies-` (e.g., `movies-read-neo4j-cypher`)
- The local database tools will be prefixed with `local-` (e.g., `local-get-neo4j-schema`)

Here is an example connection for the movie database with Movie, Person (Actor, Director), Genre, User and ratings:

```json
{
  "mcpServers": {
    "movies-neo4j": {
      "command": "uvx",
      "args": [ "mcp-neo4j-cypher@0.2.4" ],
      "env": {
        "NEO4J_URI": "neo4j+s://demo.neo4jlabs.com",
        "NEO4J_USERNAME": "recommendations",
        "NEO4J_PASSWORD": "recommendations",
        "NEO4J_DATABASE": "recommendations"
      }
    }   
  }
}
```

Syntax with `--db-url`, `--username`, `--password` and other command line arguments is still supported but environment variables are preferred:

<details>
  <summary>Legacy Syntax</summary>

```json
"mcpServers": {
  "neo4j": {
    "command": "uvx",
    "args": [
      "mcp-neo4j-cypher@0.2.4",
      "--db-url",
      "bolt://localhost",
      "--username",
      "neo4j",
      "--password",
      "<your-password>",
      "--namespace",
      "mydb",
      "--transport",
      "sse",
      "--server-host",
      "0.0.0.0",
      "--server-port",
      "8000"
    ]
  }
}
```

Here is an example connection for the movie database with Movie, Person (Actor, Director), Genre, User and ratings:

```json
{
  "mcpServers": {
    "movies-neo4j": {
      "command": "uvx",
      "args": ["mcp-neo4j-cypher@0.2.4", 
      "--db-url", "neo4j+s://demo.neo4jlabs.com", 
      "--user", "recommendations", 
      "--password", "recommendations",
      "--database", "recommendations"]
    }   
  }
}
```
</details>

### 🐳 Using with Docker

```json
"mcpServers": {
  "neo4j": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "-e", "NEO4J_URI=bolt://host.docker.internal:7687",
      "-e", "NEO4J_USERNAME=neo4j",
      "-e", "NEO4J_PASSWORD=<your-password>",
      "-e", "NEO4J_NAMESPACE=mydb",
      "mcp/neo4j-cypher:latest"
    ]
  }
}
```

## 🐳 Docker Deployment

The Neo4j MCP server can be deployed using Docker for both local development and production use. Docker deployment supports both stdio and SSE transports.

### 📦 Pre-built Image

Use the pre-built Docker image for quick deployment:

```bash
# Run with SSE transport
docker run --rm -p 8000:8000 \
  -e NEO4J_URI="bolt://host.docker.internal:7687" \
  -e NEO4J_USERNAME="neo4j" \
  -e NEO4J_PASSWORD="password" \
  -e NEO4J_DATABASE="neo4j" \
  -e NEO4J_TRANSPORT="sse" \
  -e NEO4J_MCP_SERVER_HOST="0.0.0.0" \
  -e NEO4J_MCP_SERVER_PORT="8000" \
  mcp/neo4j-cypher:latest
```

### 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEO4J_URI` | `bolt://localhost:7687` | Neo4j connection URI |
| `NEO4J_USERNAME` | `neo4j` | Neo4j username |
| `NEO4J_PASSWORD` | `password` | Neo4j password |
| `NEO4J_DATABASE` | `neo4j` | Neo4j database name |
| `NEO4J_TRANSPORT` | `stdio` | Transport protocol (`stdio` or `sse`) |
| `NEO4J_NAMESPACE` | _(empty)_ | Tool namespace prefix |
| `NEO4J_MCP_SERVER_HOST` | `127.0.0.1` | Host to bind to (use `0.0.0.0` for Docker) |
| `NEO4J_MCP_SERVER_PORT` | `8000` | Port for SSE transport |

### 🌐 SSE Transport for Web Access

When using SSE transport, the server exposes an HTTP endpoint that can be accessed from web browsers or HTTP clients:

```bash
# Start the server with SSE transport
docker run -d -p 8000:8000 \
  -e NEO4J_URI="neo4j+s://demo.neo4jlabs.com" \
  -e NEO4J_USERNAME="recommendations" \
  -e NEO4J_PASSWORD="recommendations" \
  -e NEO4J_DATABASE="recommendations" \
  -e NEO4J_TRANSPORT="sse" \
  -e NEO4J_MCP_SERVER_HOST="0.0.0.0" \
  -e NEO4J_MCP_SERVER_PORT="8000" \
  --name neo4j-mcp-server \
  mcp/neo4j-cypher:latest

# Test the SSE endpoint
curl http://localhost:8000/sse

# Use with MCP Inspector
npx @modelcontextprotocol/inspector http://localhost:8000/sse
```

### 🐳 Docker Compose

For more complex deployments, you may use Docker Compose:

```yaml
version: '3.8'

services:
  # Deploy Neo4j Database (optional)
  neo4j:
    image: neo4j:5.26.1 # or another version
    environment:
      - NEO4J_AUTH=neo4j/password
      - NEO4J_PLUGINS=["apoc"]
    ports:
      - "7474:7474"  # HTTP
      - "7687:7687"  # Bolt
    volumes:
      - neo4j_data:/data

  # Deploy Cypher MCP Server
  mcp-neo4j-cypher-server:
    image: mcp/neo4j-cypher:latest
    ports:
      - "8000:8000"
    environment:
      - NEO4J_URI=bolt://host.docker.internal:7687
      - NEO4J_USERNAME=neo4j
      - NEO4J_PASSWORD=password
      - NEO4J_DATABASE=neo4j
      - NEO4J_TRANSPORT=sse
      - NEO4J_MCP_SERVER_HOST=0.0.0.0 # must be 0.0.0.0 for sse transport in Docker
      - NEO4J_MCP_SERVER_PORT=8000
      - NEO4J_NAMESPACE=local
    depends_on:
      - neo4j

volumes:
  neo4j_data:
```

Run with: `docker-compose up -d`

### 🔗 Claude Desktop Integration with Docker

For Claude Desktop integration with a Dockerized server using SSE transport:

```json
{
  "mcpServers": {
    "neo4j-docker": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "http://localhost:8000/sse"]
    }
  }
}
```

### Local Build

Build and run the Docker container:

```bash
# Build the image
docker build -t mcp/neo4j-cypher:latest .

# Run the container
docker run -e NEO4J_URI="bolt://host.docker.internal:7687" \
          -e NEO4J_USERNAME="neo4j" \
          -e NEO4J_PASSWORD="your-password" \
          -e NEO4J_NAMESPACE="mydb" \
          -e NEO4J_TRANSPORT="stdio" \
          mcp/neo4j-cypher:latest
```

## 🚀 Development

### 📦 Prerequisites

1. Install `uv` (Universal Virtualenv):
```bash
# Using pip
pip install uv

# Using Homebrew on macOS
brew install uv

# Using cargo (Rust package manager)
cargo install uv
```

2. Clone the repository and set up development environment:
```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-neo4j-cypher.git
cd mcp-neo4j-cypher

# Create and activate virtual environment using uv
uv venv
source .venv/bin/activate  # On Unix/macOS
.venv\Scripts\activate     # On Windows

# Install dependencies including dev dependencies
uv pip install -e ".[dev]"
```

3. Run Integration Tests

```bash
./tests.sh
```

### 🔧 Development Configuration

```json
# Add the server to your claude_desktop_config.json
"mcpServers": {
  "neo4j": {
    "command": "uv",
    "args": [
      "--directory", 
      "parent_of_servers_repo/servers/mcp-neo4j-cypher/src",
      "run", 
      "mcp-neo4j-cypher", 
      "--transport", 
      "stdio", 
      "--namespace", 
      "dev",
    ],
    "env": {
      "NEO4J_URI": "bolt://localhost",
      "NEO4J_USERNAME": "neo4j",
      "NEO4J_PASSWORD": "<your-password>",
      "NEO4J_DATABASE": "neo4j"
    }
  }
}
```



## 📄 License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
````

## File: mcp-neo4j/servers/mcp-neo4j-cypher/test.sh
````bash
uv run pytest tests/integration -s
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/src/mcp_neo4j_data_modeling/__init__.py
````python
import argparse
import asyncio

from . import server


def main():
    """Main entry point for the package."""
    parser = argparse.ArgumentParser(description="Neo4j Data Modeling MCP Server")
    parser.add_argument("--transport", default="stdio", help="Transport type")

    args = parser.parse_args()
    asyncio.run(
        server.main(
            args.transport,
        )
    )


__all__ = ["main", "server"]
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/src/mcp_neo4j_data_modeling/data_model.py
````python
import json
from collections import Counter
from typing import Any

from pydantic import BaseModel, Field, ValidationInfo, field_validator

NODE_COLOR_PALETTE = [
    ("#e3f2fd", "#1976d2"),  # Light Blue / Blue
    ("#f3e5f5", "#7b1fa2"),  # Light Purple / Purple
    ("#e8f5e8", "#388e3c"),  # Light Green / Green
    ("#fff3e0", "#f57c00"),  # Light Orange / Orange
    ("#fce4ec", "#c2185b"),  # Light Pink / Pink
    ("#e0f2f1", "#00695c"),  # Light Teal / Teal
    ("#f1f8e9", "#689f38"),  # Light Lime / Lime
    ("#fff8e1", "#ffa000"),  # Light Amber / Amber
    ("#e8eaf6", "#3f51b5"),  # Light Indigo / Indigo
    ("#efebe9", "#5d4037"),  # Light Brown / Brown
    ("#fafafa", "#424242"),  # Light Grey / Dark Grey
    ("#e1f5fe", "#0277bd"),  # Light Cyan / Cyan
    ("#f9fbe7", "#827717"),  # Light Yellow-Green / Olive
    ("#fff1f0", "#d32f2f"),  # Light Red / Red
    ("#f4e6ff", "#6a1b9a"),  # Light Violet / Violet
    ("#e6f7ff", "#1890ff"),  # Very Light Blue / Bright Blue
]


def _generate_relationship_pattern(
    start_node_label: str, relationship_type: str, end_node_label: str
) -> str:
    "Helper function to generate a pattern for a relationship."
    return f"(:{start_node_label})-[:{relationship_type}]->(:{end_node_label})"


class PropertySource(BaseModel):
    "The source of a property."

    column_name: str | None = Field(
        default=None, description="The column name this property maps to, if known."
    )
    table_name: str | None = Field(
        default=None,
        description="The name of the table this property's column is in, if known. May also be the name of a file.",
    )
    location: str | None = Field(
        default=None,
        description="The location of the property, if known. May be a file path, URL, etc.",
    )


class Property(BaseModel):
    "A Neo4j Property."

    name: str = Field(description="The name of the property. Should be in camelCase.")
    type: str = Field(
        default="STRING",
        description="The Neo4j type of the property. Should be all caps.",
    )
    source: PropertySource | None = Field(
        default=None, description="The source of the property, if known."
    )
    description: str | None = Field(
        default=None, description="The description of the property"
    )

    @field_validator("type")
    def validate_type(cls, v: str) -> str:
        "Validate the type."

        return v.upper()

    @classmethod
    def from_arrows(cls, arrows_property: dict[str, str]) -> "Property":
        "Convert an Arrows Property in dict format to a Property."

        description = None

        if "|" in list(arrows_property.values())[0]:
            prop_props = [
                x.strip() for x in list(arrows_property.values())[0].split("|")
            ]

            prop_type = prop_props[0]
            description = prop_props[1] if prop_props[1].lower() != "key" else None
        else:
            prop_type = list(arrows_property.values())[0]

        return cls(
            name=list(arrows_property.keys())[0],
            type=prop_type,
            description=description,
        )

    def to_arrows(self, is_key: bool = False) -> dict[str, Any]:
        "Convert a Property to an Arrows property dictionary. Final JSON string formatting is done at the data model level."
        value = f"{self.type}"
        if self.description:
            value += f" | {self.description}"
        if is_key:
            value += " | KEY"
        return {
            self.name: value,
        }


class Node(BaseModel):
    "A Neo4j Node."

    label: str = Field(
        description="The label of the node. Should be in PascalCase.", min_length=1
    )
    key_property: Property = Field(description="The key property of the node")
    properties: list[Property] = Field(
        default_factory=list, description="The properties of the node"
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="The metadata of the node. This should only be used when converting data models.",
    )

    @field_validator("properties")
    def validate_properties(
        cls, properties: list[Property], info: ValidationInfo
    ) -> list[Property]:
        "Validate the properties."
        properties = [p for p in properties if p.name != info.data["key_property"].name]

        counts = Counter([p.name for p in properties])
        for name, count in counts.items():
            if count > 1:
                raise ValueError(
                    f"Property {name} appears {count} times in node {info.data['label']}"
                )
        return properties

    def add_property(self, prop: Property) -> None:
        "Add a new property to the node."
        if prop.name in [p.name for p in self.properties]:
            raise ValueError(
                f"Property {prop.name} already exists in node {self.label}"
            )
        self.properties.append(prop)

    def remove_property(self, prop: Property) -> None:
        "Remove a property from the node."
        try:
            self.properties.remove(prop)
        except ValueError:
            pass

    @property
    def all_properties_dict(self) -> dict[str, str]:
        "Return a dictionary of all properties of the node. {property_name: property_type}"
        props = {p.name: p.type for p in self.properties} if self.properties else {}
        if self.key_property:
            props.update({self.key_property.name: f"{self.key_property.type} | KEY"})
        return props

    def get_mermaid_config_str(self) -> str:
        "Get the Mermaid configuration string for the node."
        props = [f"<br/>{self.key_property.name}: {self.key_property.type} | KEY"]
        props.extend([f"<br/>{p.name}: {p.type}" for p in self.properties])
        return f'{self.label}["{self.label}{"".join(props)}"]'

    @classmethod
    def from_arrows(cls, arrows_node_dict: dict[str, Any]) -> "Node":
        "Convert an Arrows Node to a Node."
        props = [
            Property.from_arrows({k: v})
            for k, v in arrows_node_dict["properties"].items()
            if "KEY" not in v.upper()
        ]
        keys = [
            {k: v}
            for k, v in arrows_node_dict["properties"].items()
            if "KEY" in v.upper()
        ]
        key_prop = Property.from_arrows(keys[0]) if keys else None
        metadata = {
            "position": arrows_node_dict["position"],
            "caption": arrows_node_dict["caption"],
            "style": arrows_node_dict["style"],
        }
        return cls(
            label=arrows_node_dict["labels"][0],
            key_property=key_prop,
            properties=props,
            metadata=metadata,
        )

    def to_arrows(
        self, default_position: dict[str, float] = {"x": 0.0, "y": 0.0}
    ) -> dict[str, Any]:
        "Convert a Node to an Arrows Node dictionary. Final JSON string formatting is done at the data model level."
        props = dict()
        [props.update(p.to_arrows(is_key=False)) for p in self.properties]
        props.update(self.key_property.to_arrows(is_key=True))
        return {
            "id": self.label,
            "labels": [self.label],
            "properties": props,
            "style": self.metadata.get("style", {}),
            "position": self.metadata.get("position", default_position),
            "caption": self.metadata.get("caption", ""),
        }

    def get_cypher_ingest_query_for_many_records(self) -> str:
        """
        Generate a Cypher query to ingest a list of Node records into a Neo4j database.
        This query takes a parameter $records that is a list of dictionaries, each representing a Node record.
        """
        formatted_props = ", ".join(
            [f"{p.name}: record.{p.name}" for p in self.properties]
        )
        return f"""UNWIND $records as record
MERGE (n: {self.label} {{{self.key_property.name}: record.{self.key_property.name}}})
SET n += {{{formatted_props}}}"""

    def get_cypher_constraint_query(self) -> str:
        """
        Generate a Cypher query to create a NODE KEY constraint on the node.
        This creates a range index on the key property of the node and enforces uniqueness and existence of the key property.
        """
        return f"CREATE CONSTRAINT {self.label}_constraint IF NOT EXISTS FOR (n:{self.label}) REQUIRE (n.{self.key_property.name}) IS NODE KEY"


class Relationship(BaseModel):
    "A Neo4j Relationship."

    type: str = Field(
        description="The type of the relationship. Should be in SCREAMING_SNAKE_CASE.",
        min_length=1,
    )
    start_node_label: str = Field(description="The label of the start node")
    end_node_label: str = Field(description="The label of the end node")
    key_property: Property | None = Field(
        default=None, description="The key property of the relationship, if any."
    )
    properties: list[Property] = Field(
        default_factory=list, description="The properties of the relationship, if any."
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="The metadata of the relationship. This should only be used when converting data models.",
    )

    @field_validator("properties")
    def validate_properties(
        cls, properties: list[Property], info: ValidationInfo
    ) -> list[Property]:
        "Validate the properties."
        if info.data.get("key_property"):
            properties = [
                p for p in properties if p.name != info.data["key_property"].name
            ]

        counts = Counter([p.name for p in properties])
        for name, count in counts.items():
            if count > 1:
                raise ValueError(
                    f"Property {name} appears {count} times in relationship {_generate_relationship_pattern(info.data['start_node_label'], info.data['type'], info.data['end_node_label'])}"
                )
        return properties

    def add_property(self, prop: Property) -> None:
        "Add a new property to the relationship."
        if prop.name in [p.name for p in self.properties]:
            raise ValueError(
                f"Property {prop.name} already exists in relationship {self.pattern}"
            )
        self.properties.append(prop)

    def remove_property(self, prop: Property) -> None:
        "Remove a property from the relationship."
        try:
            self.properties.remove(prop)
        except ValueError:
            pass

    @property
    def pattern(self) -> str:
        "Return the pattern of the relationship."
        return _generate_relationship_pattern(
            self.start_node_label, self.type, self.end_node_label
        )

    @property
    def all_properties_dict(self) -> dict[str, str]:
        "Return a dictionary of all properties of the relationship. {property_name: property_type}"

        props = {p.name: p.type for p in self.properties} if self.properties else {}
        if self.key_property:
            props.update({self.key_property.name: f"{self.key_property.type} | KEY"})
        return props

    def get_mermaid_config_str(self) -> str:
        "Get the Mermaid configuration string for the relationship."
        props = (
            [f"<br/>{self.key_property.name}: {self.key_property.type} | KEY"]
            if self.key_property
            else []
        )
        props.extend([f"<br/>{p.name}: {p.type}" for p in self.properties])
        return f"{self.start_node_label} -->|{self.type}{''.join(props)}| {self.end_node_label}"

    @classmethod
    def from_arrows(
        cls,
        arrows_relationship_dict: dict[str, Any],
        node_id_to_label_map: dict[str, str],
    ) -> "Relationship":
        "Convert an Arrows Relationship to a Relationship."
        props = [
            Property.from_arrows({k: v})
            for k, v in arrows_relationship_dict["properties"].items()
            if "KEY" not in v.upper()
        ]
        keys = [
            {k: v}
            for k, v in arrows_relationship_dict["properties"].items()
            if "KEY" in v.upper()
        ]
        key_prop = Property.from_arrows(keys[0]) if keys else None
        metadata = {
            "style": arrows_relationship_dict["style"],
        }
        return cls(
            type=arrows_relationship_dict["type"],
            start_node_label=node_id_to_label_map[arrows_relationship_dict["fromId"]],
            end_node_label=node_id_to_label_map[arrows_relationship_dict["toId"]],
            key_property=key_prop,
            properties=props,
            metadata=metadata,
        )

    def to_arrows(self) -> dict[str, Any]:
        "Convert a Relationship to an Arrows Relationship dictionary. Final JSON string formatting is done at the data model level."
        props = dict()
        [props.update(p.to_arrows(is_key=False)) for p in self.properties]
        if self.key_property:
            props.update(self.key_property.to_arrows(is_key=True))
        return {
            "fromId": self.start_node_label,
            "toId": self.end_node_label,
            "type": self.type,
            "properties": props,
            "style": self.metadata.get("style", {}),
        }

    def get_cypher_ingest_query_for_many_records(
        self, start_node_key_property_name: str, end_node_key_property_name: str
    ) -> str:
        """
        Generate a Cypher query to ingest a list of Relationship records into a Neo4j database.
        The sourceId and targetId properties are used to match the start and end nodes.
        This query takes a parameter $records that is a list of dictionaries, each representing a Relationship record.
        """
        formatted_props = ", ".join(
            [f"{p.name}: record.{p.name}" for p in self.properties]
        )
        key_prop = (
            f" {{{self.key_property.name}: record.{self.key_property.name}}}"
            if self.key_property
            else ""
        )
        query = f"""UNWIND $records as record
MATCH (start: {self.start_node_label} {{{start_node_key_property_name}: record.sourceId}})
MATCH (end: {self.end_node_label} {{{end_node_key_property_name}: record.targetId}})
MERGE (start)-[:{self.type}{key_prop}]->(end)"""
        if formatted_props:
            query += f"""
SET end += {{{formatted_props}}}"""
        return query

    def get_cypher_constraint_query(self) -> str | None:
        """
        Generate a Cypher query to create a RELATIONSHIP KEY constraint on the relationship.
        This creates a range index on the key property of the relationship and enforces uniqueness and existence of the key property.
        """
        if self.key_property:
            return f"CREATE CONSTRAINT {self.type}_constraint IF NOT EXISTS FOR ()-[r:{self.type}]->() REQUIRE (r.{self.key_property.name}) IS RELATIONSHIP KEY"
        else:
            return None


class DataModel(BaseModel):
    "A Neo4j Graph Data Model."

    nodes: list[Node] = Field(
        default_factory=list, description="The nodes of the data model"
    )
    relationships: list[Relationship] = Field(
        default_factory=list, description="The relationships of the data model"
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="The metadata of the data model. This should only be used when converting data models.",
    )

    @field_validator("nodes")
    def validate_nodes(cls, nodes: list[Node]) -> list[Node]:
        "Validate the nodes."

        counts = Counter([n.label for n in nodes])
        for label, count in counts.items():
            if count > 1:
                raise ValueError(
                    f"Node with label {label} appears {count} times in data model"
                )
        return nodes

    @field_validator("relationships")
    def validate_relationships(
        cls, relationships: list[Relationship], info: ValidationInfo
    ) -> list[Relationship]:
        "Validate the relationships."

        # check for duplicate relationships
        counts = Counter([r.pattern for r in relationships])
        for pattern, count in counts.items():
            if count > 1:
                raise ValueError(
                    f"Relationship with pattern {pattern} appears {count} times in data model"
                )

        # ensure source and target nodes exist
        for relationship in relationships:
            if relationship.start_node_label not in [
                n.label for n in info.data["nodes"]
            ]:
                raise ValueError(
                    f"Relationship {relationship.pattern} has a start node that does not exist in data model"
                )
            if relationship.end_node_label not in [n.label for n in info.data["nodes"]]:
                raise ValueError(
                    f"Relationship {relationship.pattern} has an end node that does not exist in data model"
                )

        return relationships

    @property
    def nodes_dict(self) -> dict[str, Node]:
        "Return a dictionary of the nodes of the data model. {node_label: node_dict}"
        return {n.label: n for n in self.nodes}

    @property
    def relationships_dict(self) -> dict[str, Relationship]:
        "Return a dictionary of the relationships of the data model. {relationship_pattern: relationship_dict}"
        return {r.pattern: r for r in self.relationships}

    def add_node(self, node: Node) -> None:
        "Add a new node to the data model."
        if node.label in [n.label for n in self.nodes]:
            raise ValueError(
                f"Node with label {node.label} already exists in data model"
            )
        self.nodes.append(node)

    def add_relationship(self, relationship: Relationship) -> None:
        "Add a new relationship to the data model."
        if relationship.pattern in [r.pattern for r in self.relationships]:
            raise ValueError(
                f"Relationship {relationship.pattern} already exists in data model"
            )
        self.relationships.append(relationship)

    def remove_node(self, node_label: str) -> None:
        "Remove a node from the data model."
        try:
            [self.nodes.remove(x) for x in self.nodes if x.label == node_label]
        except ValueError:
            pass

    def remove_relationship(
        self,
        relationship_type: str,
        relationship_start_node_label: str,
        relationship_end_node_label: str,
    ) -> None:
        "Remove a relationship from the data model."
        pattern = _generate_relationship_pattern(
            relationship_start_node_label,
            relationship_type,
            relationship_end_node_label,
        )
        try:
            [
                self.relationships.remove(x)
                for x in self.relationships
                if x.pattern == pattern
            ]
        except ValueError:
            pass

    def _generate_mermaid_config_styling_str(self) -> str:
        "Generate the Mermaid configuration string for the data model."
        node_color_config = ""

        for idx, node in enumerate(self.nodes):
            node_color_config += f"classDef node_{idx}_color fill:{NODE_COLOR_PALETTE[idx % len(NODE_COLOR_PALETTE)][0]},stroke:{NODE_COLOR_PALETTE[idx % len(NODE_COLOR_PALETTE)][1]},stroke-width:3px,color:#000,font-size:12px\nclass {node.label} node_{idx}_color\n\n"

        return f"""
%% Styling 
{node_color_config}
        """

    def get_mermaid_config_str(self) -> str:
        "Get the Mermaid configuration string for the data model."
        mermaid_nodes = [n.get_mermaid_config_str() for n in self.nodes]
        mermaid_relationships = [r.get_mermaid_config_str() for r in self.relationships]
        mermaid_styling = self._generate_mermaid_config_styling_str()
        return f"""graph TD
%% Nodes
{"\n".join(mermaid_nodes)}

%% Relationships
{"\n".join(mermaid_relationships)}

{mermaid_styling}
"""

    @classmethod
    def from_arrows(cls, arrows_data_model_dict: dict[str, Any]) -> "DataModel":
        "Convert an Arrows Data Model to a Data Model."
        nodes = [Node.from_arrows(n) for n in arrows_data_model_dict["nodes"]]
        node_id_to_label_map = {
            n["id"]: n["labels"][0] for n in arrows_data_model_dict["nodes"]
        }
        relationships = [
            Relationship.from_arrows(r, node_id_to_label_map)
            for r in arrows_data_model_dict["relationships"]
        ]
        metadata = {
            "style": arrows_data_model_dict["style"],
        }
        return cls(nodes=nodes, relationships=relationships, metadata=metadata)

    def to_arrows_dict(self) -> dict[str, Any]:
        "Convert the data model to an Arrows Data Model Python dictionary."
        node_spacing: int = 200
        y_current = 0
        arrows_nodes = []
        for idx, n in enumerate(self.nodes):
            if (idx + 1) % 5 == 0:
                y_current -= 200
            arrows_nodes.append(
                n.to_arrows(
                    default_position={"x": node_spacing * (idx % 5), "y": y_current}
                )
            )
        arrows_relationships = [r.to_arrows() for r in self.relationships]
        return {
            "nodes": arrows_nodes,
            "relationships": arrows_relationships,
            "style": self.metadata.get("style", {}),
        }

    def to_arrows_json_str(self) -> str:
        "Convert the data model to an Arrows Data Model JSON string."
        return json.dumps(self.to_arrows_dict(), indent=2)

    def get_node_cypher_ingest_query_for_many_records(self, node_label: str) -> str:
        "Generate a Cypher query to ingest a list of Node records into a Neo4j database."
        node = self.nodes_dict[node_label]
        return node.get_cypher_ingest_query_for_many_records()

    def get_relationship_cypher_ingest_query_for_many_records(
        self,
        relationship_type: str,
        relationship_start_node_label: str,
        relationship_end_node_label: str,
    ) -> str:
        "Generate a Cypher query to ingest a list of Relationship records into a Neo4j database."
        pattern = _generate_relationship_pattern(
            relationship_start_node_label,
            relationship_type,
            relationship_end_node_label,
        )
        relationship = self.relationships_dict[pattern]
        start_node = self.nodes_dict[relationship.start_node_label]
        end_node = self.nodes_dict[relationship.end_node_label]
        return relationship.get_cypher_ingest_query_for_many_records(
            start_node.key_property.name, end_node.key_property.name
        )

    def get_cypher_constraints_query(self) -> list[str]:
        """
        Generate a list of Cypher queries to create constraints on the data model.
        This creates range indexes on the key properties of the nodes and relationships and enforces uniqueness and existence of the key properties.
        """
        node_queries = [n.get_cypher_constraint_query() + ";" for n in self.nodes]
        relationship_queries = [
            r.get_cypher_constraint_query() + ";"
            for r in self.relationships
            if r.key_property is not None
        ]
        return node_queries + relationship_queries
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/src/mcp_neo4j_data_modeling/server.py
````python
import logging
from typing import Any, Literal

from mcp.server.fastmcp import FastMCP
from pydantic import Field, ValidationError

from .data_model import (
    DataModel,
    Node,
    Property,
    Relationship,
)
from .static import DATA_INGEST_PROCESS

logger = logging.getLogger("mcp_neo4j_data_modeling")


def create_mcp_server() -> FastMCP:
    """Create an MCP server instance for data modeling."""

    mcp: FastMCP = FastMCP("mcp-neo4j-data-modeling", dependencies=["pydantic"])

    @mcp.resource("resource://schema/node")
    def node_schema() -> dict[str, Any]:
        """Get the schema for a node."""
        logger.info("Getting the schema for a node.")
        return Node.model_json_schema()

    @mcp.resource("resource://schema/relationship")
    def relationship_schema() -> dict[str, Any]:
        """Get the schema for a relationship."""
        logger.info("Getting the schema for a relationship.")
        return Relationship.model_json_schema()

    @mcp.resource("resource://schema/property")
    def property_schema() -> dict[str, Any]:
        """Get the schema for a property."""
        logger.info("Getting the schema for a property.")
        return Property.model_json_schema()

    @mcp.resource("resource://schema/data_model")
    def data_model_schema() -> dict[str, Any]:
        """Get the schema for a data model."""
        logger.info("Getting the schema for a data model.")
        return DataModel.model_json_schema()

    @mcp.resource("resource://static/neo4j_data_ingest_process")
    def neo4j_data_ingest_process() -> str:
        """Get the process for ingesting data into a Neo4j database."""
        logger.info("Getting the process for ingesting data into a Neo4j database.")
        return DATA_INGEST_PROCESS

    @mcp.tool()
    def validate_node(
        node: Node, return_validated: bool = False
    ) -> bool | dict[str, Any]:
        "Validate a single node. Returns True if the node is valid, otherwise raises a ValueError. If return_validated is True, returns the validated node."
        logger.info("Validating a single node.")
        try:
            validated_node = Node.model_validate(node, strict=True)
            logger.info("Node validated successfully")
            if return_validated:
                return validated_node
            else:
                return True
        except ValidationError as e:
            logger.error(f"Validation error: {e}")
            raise ValueError(f"Validation error: {e}")

    @mcp.tool()
    def validate_relationship(
        relationship: Relationship, return_validated: bool = False
    ) -> bool | dict[str, Any]:
        "Validate a single relationship. Returns True if the relationship is valid, otherwise raises a ValueError. If return_validated is True, returns the validated relationship."
        logger.info("Validating a single relationship.")
        try:
            validated_relationship = Relationship.model_validate(
                relationship, strict=True
            )
            logger.info("Relationship validated successfully")
            if return_validated:
                return validated_relationship
            else:
                return True
        except ValidationError as e:
            logger.error(f"Validation error: {e}")
            raise ValueError(f"Validation error: {e}")

    @mcp.tool()
    def validate_data_model(
        data_model: DataModel, return_validated: bool = False
    ) -> bool | dict[str, Any]:
        "Validate the entire data model. Returns True if the data model is valid, otherwise raises a ValueError. If return_validated is True, returns the validated data model."
        logger.info("Validating the entire data model.")
        try:
            DataModel.model_validate(data_model, strict=True)
            logger.info("Data model validated successfully")
            if return_validated:
                return data_model
            else:
                return True
        except ValidationError as e:
            logger.error(f"Validation error: {e}")
            raise ValueError(f"Validation error: {e}")

    @mcp.tool()
    def load_from_arrows_json(arrows_data_model_dict: dict[str, Any]) -> DataModel:
        "Load a data model from the Arrows web application format. Returns a data model as a JSON string."
        logger.info("Loading a data model from the Arrows web application format.")
        return DataModel.from_arrows(arrows_data_model_dict)

    @mcp.tool()
    def export_to_arrows_json(data_model: DataModel) -> str:
        "Export the data model to the Arrows web application format. Returns a JSON string. This should be presented to the user as an artifact if possible."
        logger.info("Exporting the data model to the Arrows web application format.")
        return data_model.to_arrows_json_str()

    @mcp.tool()
    def get_mermaid_config_str(data_model: DataModel) -> str:
        "Get the Mermaid configuration string for the data model. This may be visualized in Claude Desktop and other applications with Mermaid support."
        logger.info("Getting the Mermaid configuration string for the data model.")
        try:
            dm_validated = DataModel.model_validate(data_model, strict=True)
        except ValidationError as e:
            logger.error(f"Validation error: {e}")
            raise ValueError(f"Validation error: {e}")
        return dm_validated.get_mermaid_config_str()

    @mcp.tool()
    def get_node_cypher_ingest_query(
        node: Node = Field(description="The node to get the Cypher query for."),
    ) -> str:
        """
        Get the Cypher query to ingest a list of Node records into a Neo4j database.
        This should be used to ingest data into a Neo4j database.
        This is a parameterized Cypher query that takes a list of records as input to the $records parameter.
        """
        logger.info(
            f"Getting the Cypher query to ingest a list of Node records into a Neo4j database for node {node.label}."
        )
        return node.get_cypher_ingest_query_for_many_records()

    @mcp.tool()
    def get_relationship_cypher_ingest_query(
        data_model: DataModel = Field(
            description="The data model snippet that contains the relationship, start node and end node."
        ),
        relationship_type: str = Field(
            description="The type of the relationship to get the Cypher query for."
        ),
        relationship_start_node_label: str = Field(
            description="The label of the relationship start node."
        ),
        relationship_end_node_label: str = Field(
            description="The label of the relationship end node."
        ),
    ) -> str:
        """
        Get the Cypher query to ingest a list of Relationship records into a Neo4j database.
        This should be used to ingest data into a Neo4j database.
        This is a parameterized Cypher query that takes a list of records as input to the $records parameter.
        The records must contain the Relationship properties, if any, as well as the sourceId and targetId properties of the start and end nodes respectively.
        """
        logger.info(
            "Getting the Cypher query to ingest a list of Relationship records into a Neo4j database."
        )
        return data_model.get_relationship_cypher_ingest_query_for_many_records(
            relationship_type,
            relationship_start_node_label,
            relationship_end_node_label,
        )

    @mcp.tool()
    def get_constraints_cypher_queries(data_model: DataModel) -> list[str]:
        "Get the Cypher queries to create constraints on the data model. This creates range indexes on the key properties of the nodes and relationships and enforces uniqueness and existence of the key properties."
        logger.info(
            "Getting the Cypher queries to create constraints on the data model."
        )
        return data_model.get_cypher_constraints_query()

    return mcp


async def main(
    transport: Literal["stdio", "sse"] = "stdio",
) -> None:
    logger.info("Starting MCP Neo4j Data Modeling Server")

    mcp = create_mcp_server()

    match transport:
        case "stdio":
            await mcp.run_stdio_async()
        case "sse":
            await mcp.run_sse_async()
        case _:
            raise ValueError(
                f"Invalid transport: {transport} | Must be either 'stdio' or 'sse'"
            )


if __name__ == "__main__":
    main()
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/src/mcp_neo4j_data_modeling/static.py
````python
DATA_INGEST_PROCESS = """
Follow these steps when ingesting data into Neo4j.
1. Create constraints before loading any data.
2. Load all nodes before relationships.
3. Then load relationships serially to avoid deadlocks.
"""
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/tests/integration/conftest.py
````python
import os
from typing import Any

import pytest
import pytest_asyncio
from neo4j import AsyncGraphDatabase
from testcontainers.neo4j import Neo4jContainer

from mcp_neo4j_data_modeling.server import create_mcp_server

neo4j = (
    Neo4jContainer("neo4j:latest")
    .with_env("NEO4J_apoc_export_file_enabled", "true")
    .with_env("NEO4J_apoc_import_file_enabled", "true")
    .with_env("NEO4J_apoc_import_file_use__neo4j__config", "true")
    .with_env("NEO4J_PLUGINS", '["apoc"]')
)


@pytest.fixture(scope="module", autouse=True)
def setup(request):
    neo4j.start()

    def remove_container():
        neo4j.get_driver().close()
        neo4j.stop()

    request.addfinalizer(remove_container)
    os.environ["NEO4J_URI"] = neo4j.get_connection_url()
    os.environ["NEO4J_HOST"] = neo4j.get_container_host_ip()
    os.environ["NEO4J_PORT"] = neo4j.get_exposed_port(7687)

    yield neo4j


@pytest_asyncio.fixture(scope="function")
async def async_neo4j_driver(setup: Neo4jContainer):
    driver = AsyncGraphDatabase.driver(
        setup.get_connection_url(), auth=(setup.username, setup.password)
    )
    try:
        yield driver
    finally:
        await driver.close()


@pytest_asyncio.fixture(scope="function")
async def mcp_server(async_neo4j_driver):
    mcp = create_mcp_server(async_neo4j_driver, "neo4j")

    return mcp


@pytest.fixture(scope="function")
def init_data(setup: Neo4jContainer, clear_data: Any):
    with setup.get_driver().session(database="neo4j") as session:
        session.run("CREATE (a:Person {name: 'Alice', age: 30})")
        session.run("CREATE (b:Person {name: 'Bob', age: 25})")
        session.run("CREATE (c:Person {name: 'Charlie', age: 35})")
        session.run(
            "MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'}) CREATE (a)-[:FRIEND]->(b)"
        )
        session.run(
            "MATCH (b:Person {name: 'Bob'}), (c:Person {name: 'Charlie'}) CREATE (b)-[:FRIEND]->(c)"
        )


@pytest.fixture(scope="function")
def clear_data(setup: Neo4jContainer):
    with setup.get_driver().session(database="neo4j") as session:
        session.run("MATCH (n) DETACH DELETE n")
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/tests/unit/conftest.py
````python
from typing import Any

import pytest

from mcp_neo4j_data_modeling.data_model import DataModel, Node, Property, Relationship


@pytest.fixture(scope="function")
def arrows_data_model_dict() -> dict[str, Any]:
    return {
        "style": {
            "font-family": "sans-serif",
            "background-color": "#ffffff",
            "background-image": "",
            "background-size": "100%",
            "node-color": "#ffffff",
            "border-width": 4,
            "border-color": "#000000",
            "radius": 50,
            "node-padding": 5,
            "node-margin": 2,
            "outside-position": "auto",
            "node-icon-image": "",
            "node-background-image": "",
            "icon-position": "inside",
            "icon-size": 64,
            "caption-position": "inside",
            "caption-max-width": 200,
            "caption-color": "#000000",
            "caption-font-size": 50,
            "caption-font-weight": "normal",
            "label-position": "inside",
            "label-display": "pill",
            "label-color": "#000000",
            "label-background-color": "#ffffff",
            "label-border-color": "#000000",
            "label-border-width": 4,
            "label-font-size": 40,
            "label-padding": 5,
            "label-margin": 4,
            "directionality": "directed",
            "detail-position": "inline",
            "detail-orientation": "parallel",
            "arrow-width": 5,
            "arrow-color": "#000000",
            "margin-start": 5,
            "margin-end": 5,
            "margin-peer": 20,
            "attachment-start": "normal",
            "attachment-end": "normal",
            "relationship-icon-image": "",
            "type-color": "#000000",
            "type-background-color": "#ffffff",
            "type-border-color": "#000000",
            "type-border-width": 0,
            "type-font-size": 16,
            "type-padding": 5,
            "property-position": "outside",
            "property-alignment": "colon",
            "property-color": "#000000",
            "property-font-size": 16,
            "property-font-weight": "normal",
        },
        "nodes": [
            {
                "id": "n0",
                "position": {"x": 105.3711141386136, "y": -243.80584874322315},
                "caption": "",
                "labels": ["Person"],
                "properties": {"name": "STRING | KEY", "age": "INTEGER"},
                "style": {},
            },
            {
                "id": "n1",
                "position": {"x": 142.1337531280864, "y": 50},
                "caption": "",
                "labels": ["Address"],
                "properties": {
                    "fullAddress": "STRING | KEY",
                },
                "style": {},
            },
            {
                "id": "n2",
                "position": {"x": 484.55353547755726, "y": -279.86295267473423},
                "caption": "",
                "labels": ["Pet"],
                "properties": {"name": "STRING | KEY", "kind": "STRING"},
                "style": {},
            },
            {
                "id": "n3",
                "position": {"x": 675, "y": 50},
                "caption": "",
                "labels": ["Toy"],
                "properties": {"name": "STRING | KEY", "kind": "STRING"},
                "style": {},
            },
        ],
        "relationships": [
            {
                "id": "n0",
                "fromId": "n0",
                "toId": "n1",
                "type": "HAS_ADDRESS",
                "properties": {},
                "style": {},
            },
            {
                "id": "n1",
                "fromId": "n0",
                "toId": "n0",
                "type": "KNOWS",
                "properties": {},
                "style": {},
            },
            {
                "id": "n2",
                "fromId": "n0",
                "toId": "n2",
                "type": "HAS_PET",
                "properties": {},
                "style": {},
            },
            {
                "id": "n3",
                "fromId": "n2",
                "toId": "n3",
                "type": "PLAYS_WITH",
                "properties": {},
                "style": {},
            },
        ],
    }


@pytest.fixture(scope="function")
def valid_data_model() -> DataModel:
    "A simple valid data model with a Person node, a Place node, and a LIVES_IN relationship."
    nodes = [
        Node(
            label="Person",
            key_property=Property(
                name="id", type="STRING", description="Unique identifier"
            ),
            properties=[
                Property(name="name", type="STRING", description="Name of the person"),
                Property(name="age", type="INTEGER", description="Age of the person"),
            ],
        ),
        Node(
            label="Place",
            key_property=Property(
                name="id", type="STRING", description="Unique identifier"
            ),
            properties=[
                Property(name="name", type="STRING", description="Name of the place")
            ],
        ),
    ]

    relationship = Relationship(
        type="LIVES_IN",
        start_node_label="Person",
        end_node_label="Place",
    )
    return DataModel(nodes=nodes, relationships=[relationship])
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/tests/unit/test_data_model.py
````python
import json
from typing import Any

import pytest
from pydantic import ValidationError

from mcp_neo4j_data_modeling.data_model import DataModel, Node, Property, Relationship


def test_node_add_property_new():
    """Test adding a new property to a node."""
    key_prop = Property(name="id", type="string", description="Unique identifier")
    node = Node(
        label="Person",
        key_property=key_prop,
        properties=[Property(name="name", type="string", description="Full name")],
    )

    new_prop = Property(name="age", type="integer", description="Age in years")
    node.add_property(new_prop)

    assert len(node.properties) == 2
    assert any(p.name == "age" for p in node.properties)


def test_node_add_property_existing():
    """Test adding an existing property to a node should raise an error."""
    key_prop = Property(name="id", type="string", description="Unique identifier")
    node = Node(
        label="Person",
        key_property=key_prop,
        properties=[Property(name="name", type="string", description="Full name")],
    )

    duplicate_prop = Property(name="name", type="string", description="Another name")

    with pytest.raises(ValueError, match="Property name already exists"):
        node.add_property(duplicate_prop)


def test_node_remove_property():
    """Test removing a property from a node."""
    key_prop = Property(name="id", type="string", description="Unique identifier")
    name_prop = Property(name="name", type="string", description="Full name")
    age_prop = Property(name="age", type="integer", description="Age in years")

    node = Node(label="Person", key_property=key_prop, properties=[name_prop, age_prop])

    node.remove_property(name_prop)

    assert len(node.properties) == 1
    assert not any(p.name == "name" for p in node.properties)


def test_node_validate_properties_key_prop_in_properties_list():
    """Test validating properties of a node when key property is in properties list."""
    key_prop = Property(name="id", type="string", description="Unique identifier")
    node = Node(
        label="Person",
        key_property=key_prop,
        properties=[
            Property(name="name", type="string", description="Full name"),
            Property(name="id", type="string", description="Unique identifier"),
        ],
    )

    assert len(node.properties) == 1
    assert not any(p.name == "id" for p in node.properties)


def test_node_validate_properties_dupe_property_names():
    """Test validating properties of a node when there are duplicate property names."""
    with pytest.raises(
        ValidationError, match="Property name appears 2 times in node Person"
    ):
        Node(
            label="Person",
            key_property=Property(
                name="id", type="string", description="Unique identifier"
            ),
            properties=[
                Property(name="name", type="string", description="Full name"),
                Property(name="name", type="string", description="Another name"),
            ],
        )


def test_relationship_add_property_new():
    """Test adding a new property to a relationship."""
    key_prop = Property(name="since", type="date", description="Start date")
    relationship = Relationship(
        type="KNOWS",
        start_node_label="Person",
        end_node_label="Person",
        key_property=key_prop,
        properties=[
            Property(name="weight", type="float", description="Relationship strength")
        ],
    )

    new_prop = Property(name="context", type="string", description="How they met")
    relationship.add_property(new_prop)

    assert len(relationship.properties) == 2
    assert any(p.name == "context" for p in relationship.properties)


def test_relationship_add_property_existing():
    """Test adding an existing property to a relationship should raise an error."""
    relationship = Relationship(
        type="KNOWS",
        start_node_label="Person",
        end_node_label="Person",
        properties=[
            Property(name="weight", type="float", description="Relationship strength")
        ],
    )

    duplicate_prop = Property(name="weight", type="float", description="Another weight")

    with pytest.raises(ValueError, match="Property weight already exists"):
        relationship.add_property(duplicate_prop)


def test_relationship_remove_property():
    """Test removing a property from a relationship."""
    weight_prop = Property(
        name="weight", type="float", description="Relationship strength"
    )
    context_prop = Property(name="context", type="string", description="How they met")

    relationship = Relationship(
        type="KNOWS",
        start_node_label="Person",
        end_node_label="Person",
        properties=[weight_prop, context_prop],
    )

    relationship.remove_property(weight_prop)

    assert len(relationship.properties) == 1
    assert not any(p.name == "weight" for p in relationship.properties)


def test_generate_relationship_pattern():
    """Test generating relationship pattern string."""
    relationship = Relationship(
        type="KNOWS", start_node_label="Person", end_node_label="Person", properties=[]
    )

    expected_pattern = "(:Person)-[:KNOWS]->(:Person)"
    assert relationship.pattern == expected_pattern


def test_relationship_validate_properties_key_prop_in_properties_list():
    """Test validating properties of a relationship when key property is in properties list."""
    key_prop = Property(name="id", type="string", description="Unique identifier")
    relationship = Relationship(
        start_node_label="Person",
        end_node_label="Person",
        type="KNOWS",
        key_property=key_prop,
        properties=[
            Property(name="name", type="string", description="Full name"),
            Property(name="id", type="string", description="Unique identifier"),
        ],
    )

    assert len(relationship.properties) == 1
    assert not any(p.name == "id" for p in relationship.properties)


def test_relationship_validate_properties_dupe_property_names():
    """Test validating properties of a relationship when there are duplicate property names."""
    with pytest.raises(
        ValidationError,
        match=r"Property name appears 2 times in relationship \(:Person\)-\[:KNOWS\]->\(:Person\)",
    ):
        Relationship(
            start_node_label="Person",
            end_node_label="Person",
            type="KNOWS",
            key_property=Property(
                name="id", type="string", description="Unique identifier"
            ),
            properties=[
                Property(name="name", type="string", description="Full name"),
                Property(name="name", type="string", description="Another name"),
            ],
        )


def test_data_model_validate_nodes_valid():
    """Test data model validation with valid nodes."""
    key_prop1 = Property(name="id", type="string", description="Unique identifier")
    key_prop2 = Property(name="code", type="string", description="Company code")

    nodes = [
        Node(label="Person", key_property=key_prop1, properties=[]),
        Node(label="Company", key_property=key_prop2, properties=[]),
    ]

    data_model = DataModel(nodes=nodes, relationships=[])

    # Should not raise an exception
    assert len(data_model.nodes) == 2


def test_data_model_validate_nodes_invalid_dupe_labels():
    """Test data model validation with duplicate node labels."""
    key_prop = Property(name="id", type="string", description="Unique identifier")

    nodes = [
        Node(label="Person", key_property=key_prop, properties=[]),
        Node(label="Person", key_property=key_prop, properties=[]),
    ]

    with pytest.raises(
        ValidationError, match="Node with label Person appears 2 times in data model"
    ):
        DataModel(nodes=nodes, relationships=[])


def test_data_model_validate_relationships_valid():
    """Test data model validation with valid relationships."""
    nodes = [
        Node(
            label="Person",
            key_property=Property(
                name="id", type="STRING", description="Unique identifier"
            ),
            properties=[],
        ),
        Node(
            label="Company",
            key_property=Property(
                name="id", type="STRING", description="Unique identifier"
            ),
            properties=[],
        ),
    ]
    relationships = [
        Relationship(
            type="KNOWS",
            start_node_label="Person",
            end_node_label="Person",
            properties=[],
        ),
        Relationship(
            type="WORKS_FOR",
            start_node_label="Person",
            end_node_label="Company",
            properties=[],
        ),
    ]

    data_model = DataModel(nodes=nodes, relationships=relationships)

    # Should not raise an exception
    assert len(data_model.relationships) == 2


def test_data_model_validate_relationships_invalid_dupe_patterns():
    """Test data model validation with duplicate relationship patterns."""
    relationships = [
        Relationship(
            type="KNOWS",
            start_node_label="Person",
            end_node_label="Person",
            properties=[],
        ),
        Relationship(
            type="KNOWS",
            start_node_label="Person",
            end_node_label="Person",
            properties=[],
        ),
    ]
    with pytest.raises(
        ValidationError,
        match=r"Relationship with pattern \(:Person\)-\[:KNOWS\]->\(:Person\) appears 2 times in data model",
    ):
        DataModel(nodes=[], relationships=relationships)


def test_data_model_validate_relationships_invalid_start_node_does_not_exist():
    """Test data model validation with a start node that does not exist."""
    nodes = [
        Node(
            label="Pet",
            key_property=Property(
                name="id", type="string", description="Unique identifier"
            ),
        ),
        Node(
            label="Place",
            key_property=Property(
                name="id", type="string", description="Unique identifier"
            ),
        ),
    ]
    relationships = [
        Relationship(
            type="KNOWS", start_node_label="Person", end_node_label="Pet", properties=[]
        )
    ]
    with pytest.raises(
        ValidationError,
        match=r"Relationship \(:Person\)-\[:KNOWS\]->\(:Pet\) has a start node that does not exist in data model",
    ):
        DataModel(nodes=nodes, relationships=relationships)


def test_data_model_validate_relationships_invalid_end_node_does_not_exist():
    """Test data model validation with an end node that does not exist."""
    nodes = [
        Node(
            label="Person",
            key_property=Property(
                name="id", type="string", description="Unique identifier"
            ),
        ),
        Node(
            label="Place",
            key_property=Property(
                name="id", type="string", description="Unique identifier"
            ),
        ),
    ]

    relationships = [
        Relationship(
            type="KNOWS", start_node_label="Person", end_node_label="Pet", properties=[]
        )
    ]
    with pytest.raises(
        ValidationError,
        match=r"Relationship \(:Person\)-\[:KNOWS\]->\(:Pet\) has an end node that does not exist in data model",
    ):
        DataModel(nodes=nodes, relationships=relationships)


def test_data_model_from_arrows(arrows_data_model_dict: dict[str, Any]):
    """Test converting an Arrows Data Model to a Data Model."""
    data_model = DataModel.from_arrows(arrows_data_model_dict)
    assert len(data_model.nodes) == 4
    assert len(data_model.relationships) == 4
    assert data_model.nodes[0].label == "Person"
    assert data_model.nodes[0].key_property.name == "name"
    assert data_model.nodes[0].key_property.type == "STRING"
    assert data_model.nodes[0].metadata == {
        "position": {"x": 105.3711141386136, "y": -243.80584874322315},
        "caption": "",
        "style": {},
    }
    assert len(data_model.nodes[0].properties) == 1
    assert data_model.nodes[0].properties[0].name == "age"
    assert data_model.nodes[0].properties[0].type == "INTEGER"
    assert data_model.nodes[0].properties[0].description is None
    assert data_model.nodes[1].label == "Address"
    assert data_model.nodes[1].key_property.name == "fullAddress"
    assert data_model.nodes[1].key_property.type == "STRING"
    assert data_model.relationships[0].metadata == {
        "style": {},
    }
    assert {"Person", "Address", "Pet", "Toy"} == {n.label for n in data_model.nodes}
    assert {"KNOWS", "HAS_ADDRESS", "HAS_PET", "PLAYS_WITH"} == {
        r.type for r in data_model.relationships
    }
    assert data_model.metadata == {
        "style": {
            "font-family": "sans-serif",
            "background-color": "#ffffff",
            "background-image": "",
            "background-size": "100%",
            "node-color": "#ffffff",
            "border-width": 4,
            "border-color": "#000000",
            "radius": 50,
            "node-padding": 5,
            "node-margin": 2,
            "outside-position": "auto",
            "node-icon-image": "",
            "node-background-image": "",
            "icon-position": "inside",
            "icon-size": 64,
            "caption-position": "inside",
            "caption-max-width": 200,
            "caption-color": "#000000",
            "caption-font-size": 50,
            "caption-font-weight": "normal",
            "label-position": "inside",
            "label-display": "pill",
            "label-color": "#000000",
            "label-background-color": "#ffffff",
            "label-border-color": "#000000",
            "label-border-width": 4,
            "label-font-size": 40,
            "label-padding": 5,
            "label-margin": 4,
            "directionality": "directed",
            "detail-position": "inline",
            "detail-orientation": "parallel",
            "arrow-width": 5,
            "arrow-color": "#000000",
            "margin-start": 5,
            "margin-end": 5,
            "margin-peer": 20,
            "attachment-start": "normal",
            "attachment-end": "normal",
            "relationship-icon-image": "",
            "type-color": "#000000",
            "type-background-color": "#ffffff",
            "type-border-color": "#000000",
            "type-border-width": 0,
            "type-font-size": 16,
            "type-padding": 5,
            "property-position": "outside",
            "property-alignment": "colon",
            "property-color": "#000000",
            "property-font-size": 16,
            "property-font-weight": "normal",
        }
    }


def test_data_model_to_arrows():
    nodes = [
        Node(
            label="Person",
            key_property=Property(
                name="id", type="STRING", description="Unique identifier"
            ),
            properties=[
                Property(name="name", type="STRING", description="Name of the person")
            ],
        ),
        Node(
            label="Company",
            key_property=Property(
                name="id2", type="STRING", description="Unique identifier 2"
            ),
            properties=[],
        ),
    ]
    relationships = [
        Relationship(
            type="KNOWS",
            start_node_label="Person",
            end_node_label="Person",
            properties=[],
        ),
        Relationship(
            type="WORKS_FOR",
            start_node_label="Person",
            end_node_label="Company",
            properties=[],
        ),
    ]

    data_model = DataModel(nodes=nodes, relationships=relationships)

    arrows_data_model_dict = data_model.to_arrows_dict()
    assert len(arrows_data_model_dict["nodes"]) == 2
    assert len(arrows_data_model_dict["relationships"]) == 2
    assert arrows_data_model_dict["nodes"][0]["id"] == "Person"
    assert arrows_data_model_dict["nodes"][0]["properties"] == {
        "id": "STRING | Unique identifier | KEY",
        "name": "STRING | Name of the person",
    }
    assert arrows_data_model_dict["nodes"][0]["position"] == {"x": 0.0, "y": 0.0}
    assert arrows_data_model_dict["nodes"][0]["caption"] == ""
    assert arrows_data_model_dict["nodes"][0]["style"] == {}
    assert arrows_data_model_dict["nodes"][1]["id"] == "Company"
    assert arrows_data_model_dict["nodes"][1]["properties"] == {
        "id2": "STRING | Unique identifier 2 | KEY"
    }
    assert arrows_data_model_dict["nodes"][1]["position"] == {"x": 200.0, "y": 0.0}
    assert arrows_data_model_dict["nodes"][1]["caption"] == ""
    assert arrows_data_model_dict["nodes"][1]["style"] == {}
    assert arrows_data_model_dict["relationships"][0]["fromId"] == "Person"


def test_data_model_arrows_round_trip(arrows_data_model_dict: dict[str, Any]):
    """Test converting a Data Model to an Arrows Data Model and back."""
    data_model = DataModel.from_arrows(arrows_data_model_dict)
    arrows_data_model_dict_copy = json.loads(data_model.to_arrows_json_str())

    assert (
        arrows_data_model_dict_copy["nodes"][0]["properties"]["name"]
        == arrows_data_model_dict["nodes"][0]["properties"]["name"]
    )
    assert (
        arrows_data_model_dict_copy["nodes"][0]["properties"]["name"]
        == arrows_data_model_dict["nodes"][0]["properties"]["name"]
    )
    assert (
        arrows_data_model_dict_copy["nodes"][1]["properties"]
        == arrows_data_model_dict["nodes"][1]["properties"]
    )
    assert (
        arrows_data_model_dict_copy["relationships"][0]["type"]
        == arrows_data_model_dict["relationships"][0]["type"]
    )
    assert (
        arrows_data_model_dict_copy["relationships"][1]["type"]
        == arrows_data_model_dict["relationships"][1]["type"]
    )
    assert arrows_data_model_dict_copy["style"] == arrows_data_model_dict["style"]


def test_node_cypher_generation_for_many_records():
    """Test generating a Cypher query to ingest a list of Node records into a Neo4j database."""
    node = Node(
        label="Person",
        key_property=Property(
            name="id", type="STRING", description="Unique identifier"
        ),
        properties=[
            Property(name="name", type="STRING", description="Name of the person"),
            Property(name="age", type="INTEGER", description="Age of the person"),
        ],
    )

    query = node.get_cypher_ingest_query_for_many_records()

    assert (
        query
        == """UNWIND $records as record
MERGE (n: Person {id: record.id})
SET n += {name: record.name, age: record.age}"""
    )


def test_relationship_cypher_generation_for_many_records():
    """Test generating a Cypher query to ingest a list of Relationship records into a Neo4j database."""
    relationship = Relationship(
        type="KNOWS",
        start_node_label="Person",
        end_node_label="Place",
        key_property=Property(
            name="relId", type="STRING", description="Unique identifier"
        ),
        properties=[Property(name="since", type="DATE", description="Since date")],
    )

    query = relationship.get_cypher_ingest_query_for_many_records(
        start_node_key_property_name="personId", end_node_key_property_name="placeId"
    )

    assert (
        query
        == """UNWIND $records as record
MATCH (start: Person {personId: record.sourceId})
MATCH (end: Place {placeId: record.targetId})
MERGE (start)-[:KNOWS {relId: record.relId}]->(end)
SET end += {since: record.since}"""
    )


def test_relationship_cypher_generation_for_many_records_no_key_property():
    """Test generating a Cypher query to ingest a list of Relationship records into a Neo4j database."""
    relationship = Relationship(
        type="KNOWS",
        start_node_label="Person",
        end_node_label="Place",
        properties=[Property(name="since", type="DATE", description="Since date")],
    )

    query = relationship.get_cypher_ingest_query_for_many_records(
        start_node_key_property_name="personId", end_node_key_property_name="placeId"
    )

    assert (
        query
        == """UNWIND $records as record
MATCH (start: Person {personId: record.sourceId})
MATCH (end: Place {placeId: record.targetId})
MERGE (start)-[:KNOWS]->(end)
SET end += {since: record.since}"""
    )


def test_relationship_cypher_generation_for_many_records_no_properties():
    """Test generating a Cypher query to ingest a list of Relationship records into a Neo4j database."""
    relationship = Relationship(
        type="KNOWS",
        start_node_label="Person",
        end_node_label="Place",
    )
    query = relationship.get_cypher_ingest_query_for_many_records(
        start_node_key_property_name="personId", end_node_key_property_name="placeId"
    )

    assert (
        query
        == """UNWIND $records as record
MATCH (start: Person {personId: record.sourceId})
MATCH (end: Place {placeId: record.targetId})
MERGE (start)-[:KNOWS]->(end)"""
    )


def test_get_node_cypher_ingest_query_for_many_records(valid_data_model: DataModel):
    """Test generating a Cypher query to ingest a list of Node records into a Neo4j database."""

    query = valid_data_model.get_node_cypher_ingest_query_for_many_records("Person")

    assert (
        query
        == """UNWIND $records as record
MERGE (n: Person {id: record.id})
SET n += {name: record.name, age: record.age}"""
    )


def test_get_relationship_cypher_ingest_query_for_many_records(
    valid_data_model: DataModel,
):
    """Test generating a Cypher query to ingest a list of Relationship records into a Neo4j database."""
    query = valid_data_model.get_relationship_cypher_ingest_query_for_many_records(
        "LIVES_IN", "Person", "Place"
    )

    assert (
        query
        == """UNWIND $records as record
MATCH (start: Person {id: record.sourceId})
MATCH (end: Place {id: record.targetId})
MERGE (start)-[:LIVES_IN]->(end)"""
    )


def test_get_cypher_constraints_query(valid_data_model: DataModel):
    """Test generating a list of Cypher queries to create constraints on the data model."""
    queries = valid_data_model.get_cypher_constraints_query()

    assert len(queries) == 2
    assert (
        queries[0]
        == "CREATE CONSTRAINT Person_constraint IF NOT EXISTS FOR (n:Person) REQUIRE (n.id) IS NODE KEY;"
    )
    assert (
        queries[1]
        == "CREATE CONSTRAINT Place_constraint IF NOT EXISTS FOR (n:Place) REQUIRE (n.id) IS NODE KEY;"
    )
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/.dockerignore
````
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.idea/
.vscode/
*.swp
*.swo

# Git
.git
.gitignore

# Docker
Dockerfile
.dockerignore

# Documentation
docs/
*.md
!README.md
!pyproject.toml

# Tests
tests/
test/
testing/
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/.flake8
````
[flake8]
exclude =
	.git,
	__pycache__,
	build,
	dist,
	.tox,
	venv,
	.venv,
	.pytest_cache
max-line-length = 120
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/.python-version
````
3.12.7
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/CHANGELOG.md
````markdown
## Next

### Fixed

### Changed

### Added

## v0.1.1

### Fixed
* Shorten tool names to comply with Cursor name length restrictions

### Changed
* Removed NVL visualization due to compatibility issues

### Added
* Code generation tools for ingestion queries
* Resource that explains the recommended process of ingesting data into Neo4j
* Mermaid visualization configuration generation

## v0.1.0

* Basic functionality 
  * Expose schemas for Data Model, Node, Relationship and Property
  * Validation tools
* Visualize data model in interactive browser window   
* Import / Export from Arrows web application
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/Dockerfile
````
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN pip install uv

# Copy dependency files first
COPY pyproject.toml /app/
COPY uv.lock /app/

# Copy the source code
COPY src/ /app/src/
COPY README.md /app/

# Install the package
RUN uv sync


# Command to run the server using the package entry point
CMD ["sh", "-c", "uv run mcp-neo4j-data-modeling --transport ${MCP_TRANSPORT}"]
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/Makefile
````
# Makefile for cypher-guard Python bindings

.PHONY: format test clean inspector build_local_docker_image

format:
	uv run ruff check --select I . --fix
	uv run ruff check --fix .
	uv run ruff format .

test:
	uv run pytest tests/ -s 

inspector:
	npx @modelcontextprotocol/inspector uv --directory src/mcp_neo4j_data_modeling run mcp-neo4j-data-modeling

build_local_docker_image:
	docker build -t mcp-neo4j-data-modeling .

clean:
	rm -rf .mypy_cache/
	rm -rf .ruff_cache/
	rm -rf .pytest_cache/
	rm -rf .vscode/
	rm -rf .venv/
	rm -rf .mypy_cache/
	rm -rf .ruff_cache/
	rm -rf .pytest_cache/
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/pyproject.toml
````toml
[project]
name = "mcp-neo4j-data-modeling"
version = "0.1.1"
description = "A simple Neo4j MCP server for creating graph data models."
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "mcp[cli]>=1.6.0",
    "pydantic>=2.10.1",
]


[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.uv]
dev-dependencies = [
    "ipykernel>=6.29.5",
    "pyright>=1.1.389",
    "pytest>=7.0.0",
    "pytest-asyncio>=0.20.3",
    "ruff>=0.11.5",
    "testcontainers[neo4j]>=4.10.0",
]

[project.scripts]
mcp-neo4j-data-modeling = "mcp_neo4j_data_modeling:main"
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/pyrightconfig.json
````json
{
    "venvPath": ".",
    "venv": ".venv"
}
````

## File: mcp-neo4j/servers/mcp-neo4j-data-modeling/README.md
````markdown
# 🔍📊 Neo4j Data Modeling MCP Server

## 🌟 Overview

A Model Context Protocol (MCP) server implementation that provides tools for creating, visualizing, and managing Neo4j graph data models. This server enables you to define nodes, relationships, and properties to design graph database schemas that can be visualized interactively.

## 🧩 Components

### 📦 Resources

The server provides these resources:

- `resource://schema/node`
   - Get the JSON schema for a Node object
   - Returns: JSON schema defining the structure of a Node

- `resource://schema/relationship`
   - Get the JSON schema for a Relationship object
   - Returns: JSON schema defining the structure of a Relationship

- `resource://schema/property`
   - Get the JSON schema for a Property object
   - Returns: JSON schema defining the structure of a Property

- `resource://schema/data_model`
   - Get the JSON schema for a DataModel object
   - Returns: JSON schema defining the structure of a DataModel
  
- `resource://neo4j_data_ingest_process`
   - Get a detailed explanation of the recommended process for ingesting data into Neo4j using the data model
   - Returns: Markdown document explaining the ingest process


### 🛠️ Tools

The server offers these core tools:

#### ✅ Validation Tools
- `validate_node`
   - Validate a single node structure
   - Input:
     - `node` (Node): The node to validate
   - Returns: True if valid, raises ValueError if invalid

- `validate_relationship`
   - Validate a single relationship structure
   - Input:
     - `relationship` (Relationship): The relationship to validate
   - Returns: True if valid, raises ValueError if invalid

- `validate_data_model`
   - Validate the entire data model structure
   - Input:
     - `data_model` (DataModel): The data model to validate
   - Returns: True if valid, raises ValueError if invalid

#### 👁️ Visualization Tools
- `get_mermaid_config_str`
   - Generate a Mermaid diagram configuration string for the data model, suitable for visualization in tools that support Mermaid
   - Input:
     - `data_model` (DataModel): The data model to visualize
   - Returns: Mermaid configuration string representing the data model

#### 🔄 Import/Export Tools

These tools provide integration with **[Arrows](https://arrows.app/)** - a graph drawing web application for creating detailed Neo4j data models with an intuitive visual interface.

- `load_from_arrows_json`
   - Load a data model from Arrows app JSON format
   - Input:
     - `arrows_data_model_dict` (dict): JSON dictionary from Arrows app export
   - Returns: DataModel object

- `export_to_arrows_json`
   - Export a data model to Arrows app JSON format
   - Input:
     - `data_model` (DataModel): The data model to export
   - Returns: JSON string compatible with Arrows app

#### 📝 Cypher Ingest Tools

These tools may be used to create Cypher ingest queries based on the data model. These queries may then be used by other MCP servers or applications to load data into Neo4j.

- `get_constraints_cypher_queries`
   - Generate Cypher queries to create constraints (e.g., unique keys) for all nodes in the data model
   - Input:
     - `data_model` (DataModel): The data model to generate constraints for
   - Returns: List of Cypher statements for constraints

- `get_node_cypher_ingest_query`
   - Generate a Cypher query to ingest a list of node records into Neo4j
   - Input:
     - `node` (Node): The node definition (label, key property, properties)
   - Returns: Parameterized Cypher query for bulk node ingestion (using `$records`)

- `get_relationship_cypher_ingest_query`
   - Generate a Cypher query to ingest a list of relationship records into Neo4j
   - Input:
     - `data_model` (DataModel): The data model containing nodes and relationships
     - `relationship_type` (str): The type of the relationship
     - `relationship_start_node_label` (str): The label of the start node
     - `relationship_end_node_label` (str): The label of the end node
   - Returns: Parameterized Cypher query for bulk relationship ingestion (using `$records`)

## 🔧 Usage with Claude Desktop

### 💾 Released Package

Can be found on PyPi https://pypi.org/project/mcp-neo4j-data-modeling/

Add the server to your `claude_desktop_config.json` with the transport method specified:

```json
"mcpServers": {
  "neo4j-data-modeling": {
    "command": "uvx",
    "args": [ "mcp-neo4j-data-modeling@0.1.1", "--transport", "stdio" ]
  }
}
```

### 🐳 Using with Docker

```json
"mcpServers": {
  "neo4j-data-modeling": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "mcp/neo4j-data-modeling:latest"
    ]
  }
}
```

## 🚀 Development

### 📦 Prerequisites

1. Install `uv` (Universal Virtualenv):
```bash
# Using pip
pip install uv

# Using Homebrew on macOS
brew install uv

# Using cargo (Rust package manager)
cargo install uv
```

2. Clone the repository and set up development environment:
```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-neo4j-data-modeling.git
cd mcp-neo4j-data-modeling

# Create and activate virtual environment using uv
uv venv
source .venv/bin/activate  # On Unix/macOS
.venv\Scripts\activate     # On Windows

# Install dependencies including dev dependencies
uv pip install -e ".[dev]"
```

3. Run Tests

```bash
./test.sh
```

### 🔧 Development Configuration

```json
# Add the server to your claude_desktop_config.json
"mcpServers": {
  "neo4j-data-modeling": {
    "command": "uv",
    "args": [
      "--directory", "path_to_repo/src",
      "run", "mcp-neo4j-data-modeling", "--transport", "stdio"]
  }
}
```

### 🐳 Docker

Build and run the Docker container:

```bash
# Build the image
docker build -t mcp/neo4j-data-modeling:latest .

# Run the container
docker run mcp/neo4j-data-modeling:latest
```

## 📄 License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/src/mcp_neo4j_memory/__init__.py
````python
from . import server
import asyncio
import argparse
import os


def main():
    """Main entry point for the package."""
    parser = argparse.ArgumentParser(description='Neo4j Cypher MCP Server')
    parser.add_argument('--db-url', 
                       default=os.getenv("NEO4J_URL", "bolt://localhost:7687"),
                       help='Neo4j connection URL')
    parser.add_argument('--username', 
                       default=os.getenv("NEO4J_USERNAME", "neo4j"),
                       help='Neo4j username')
    parser.add_argument('--password', 
                       default=os.getenv("NEO4J_PASSWORD", "password"),
                       help='Neo4j password')
    parser.add_argument("--database",
                        default=os.getenv("NEO4J_DATABASE", "neo4j"),
                        help="Neo4j database name")
    
    args = parser.parse_args()
    asyncio.run(server.main(args.db_url, args.username, args.password, args.database))


# Optionally expose other important items at package level
__all__ = ["main", "server"]
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/src/mcp_neo4j_memory/server.py
````python
import os
import logging
import json
from typing import Any, Dict, List, Optional
from contextlib import asynccontextmanager

import neo4j
from neo4j import GraphDatabase
from pydantic import BaseModel

import mcp.types as types
from mcp.server import NotificationOptions, Server
from mcp.server.models import InitializationOptions
import mcp.server.stdio

# Set up logging
logger = logging.getLogger('mcp_neo4j_memory')
logger.setLevel(logging.INFO)

# Models for our knowledge graph
class Entity(BaseModel):
    name: str
    type: str
    observations: List[str]

class Relation(BaseModel):
    source: str
    target: str
    relationType: str

class KnowledgeGraph(BaseModel):
    entities: List[Entity]
    relations: List[Relation]

class ObservationAddition(BaseModel):
    entityName: str
    contents: List[str]

class ObservationDeletion(BaseModel):
    entityName: str
    observations: List[str]

class Neo4jMemory:
    def __init__(self, neo4j_driver):
        self.neo4j_driver = neo4j_driver
        self.create_fulltext_index()

    def create_fulltext_index(self):
        try:
            # TODO , 
            query = """
            CREATE FULLTEXT INDEX search IF NOT EXISTS FOR (m:Memory) ON EACH [m.name, m.type, m.observations];
            """
            self.neo4j_driver.execute_query(query)
            logger.info("Created fulltext search index")
        except neo4j.exceptions.ClientError as e:
            if "An index with this name already exists" in str(e):
                logger.info("Fulltext search index already exists")
            else:
                raise e

    async def load_graph(self, filter_query="*"):
        query = """
            CALL db.index.fulltext.queryNodes('search', $filter) yield node as entity, score
            OPTIONAL MATCH (entity)-[r]-(other)
            RETURN collect(distinct {
                name: entity.name, 
                type: entity.type, 
                observations: entity.observations
            }) as nodes,
            collect(distinct {
                source: startNode(r).name, 
                target: endNode(r).name, 
                relationType: type(r)
            }) as relations
        """
        
        result = self.neo4j_driver.execute_query(query, {"filter": filter_query})
        
        if not result.records:
            return KnowledgeGraph(entities=[], relations=[])
        
        record = result.records[0]
        nodes = record.get('nodes')
        rels = record.get('relations')
        
        entities = [
            Entity(
                name=node.get('name'),
                type=node.get('type'),
                observations=node.get('observations', [])
            )
            for node in nodes if node.get('name')
        ]
        
        relations = [
            Relation(
                source=rel.get('source'),
                target=rel.get('target'),
                relationType=rel.get('relationType')
            )
            for rel in rels if rel.get('source') and rel.get('target') and rel.get('relationType')
        ]
        
        logger.debug(f"Loaded entities: {entities}")
        logger.debug(f"Loaded relations: {relations}")
        
        return KnowledgeGraph(entities=entities, relations=relations)

    async def create_entities(self, entities: List[Entity]) -> List[Entity]:
        for entity in entities:
            query = f"""
            WITH $entity as entity
            MERGE (e:Memory {{ name: entity.name }})
            SET e += entity {{ .type, .observations }}
            SET e:{entity.type}
            """
            self.neo4j_driver.execute_query(query, {"entity": entity.model_dump()})

        return entities

    async def create_relations(self, relations: List[Relation]) -> List[Relation]:
        for relation in relations:
            query = f"""
            WITH $relation as relation
            MATCH (from:Memory),(to:Memory)
            WHERE from.name = relation.source
            AND  to.name = relation.target
            MERGE (from)-[r:{relation.relationType}]->(to)
            """
            
            self.neo4j_driver.execute_query(
                query, 
                {"relation": relation.model_dump()}
            )

        return relations

    async def add_observations(self, observations: List[ObservationAddition]) -> List[Dict[str, Any]]:
        query = """
        UNWIND $observations as obs  
        MATCH (e:Memory { name: obs.entityName })
        WITH e, [o in obs.contents WHERE NOT o IN e.observations] as new
        SET e.observations = coalesce(e.observations,[]) + new
        RETURN e.name as name, new
        """
            
        result = self.neo4j_driver.execute_query(
            query, 
            {"observations": [obs.model_dump() for obs in observations]}
        )

        results = [{"entityName": record.get("name"), "addedObservations": record.get("new")} for record in result.records]
        return results

    async def delete_entities(self, entity_names: List[str]) -> None:
        query = """
        UNWIND $entities as name
        MATCH (e:Memory { name: name })
        DETACH DELETE e
        """
        
        self.neo4j_driver.execute_query(query, {"entities": entity_names})

    async def delete_observations(self, deletions: List[ObservationDeletion]) -> None:
        query = """
        UNWIND $deletions as d  
        MATCH (e:Memory { name: d.entityName })
        SET e.observations = [o in coalesce(e.observations,[]) WHERE NOT o IN d.observations]
        """
        self.neo4j_driver.execute_query(
            query, 
            {
                "deletions": [deletion.model_dump() for deletion in deletions]
            }
        )

    async def delete_relations(self, relations: List[Relation]) -> None:
        for relation in relations:
            query = f"""
            WITH $relation as relation
            MATCH (source:Memory)-[r:{relation.relationType}]->(target:Memory)
            WHERE source.name = relation.source
            AND target.name = relation.target
            DELETE r
            """
            self.neo4j_driver.execute_query(
                query, 
                {"relation": relation.model_dump()}
            )

    async def read_graph(self) -> KnowledgeGraph:
        return await self.load_graph()

    async def search_nodes(self, query: str) -> KnowledgeGraph:
        return await self.load_graph(query)

    async def find_nodes(self, names: List[str]) -> KnowledgeGraph:
        return await self.load_graph("name: (" + " ".join(names) + ")")

async def main(neo4j_uri: str, neo4j_user: str, neo4j_password: str, neo4j_database: str):
    logger.info(f"Connecting to neo4j MCP Server with DB URL: {neo4j_uri}")

    # Connect to Neo4j
    neo4j_driver = GraphDatabase.driver(
        neo4j_uri,
        auth=(neo4j_user, neo4j_password), 
        database=neo4j_database
    )
    
    # Verify connection
    try:
        neo4j_driver.verify_connectivity()
        logger.info(f"Connected to Neo4j at {neo4j_uri}")
    except Exception as e:
        logger.error(f"Failed to connect to Neo4j: {e}")
        exit(1)

    # Initialize memory
    memory = Neo4jMemory(neo4j_driver)
    
    # Create MCP server
    server = Server("mcp-neo4j-memory")

    # Register handlers
    @server.list_tools()
    async def handle_list_tools() -> List[types.Tool]:
        return [
            types.Tool(
                name="create_entities",
                description="Create multiple new entities in the knowledge graph",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "entities": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "name": {"type": "string", "description": "The name of the entity"},
                                    "type": {"type": "string", "description": "The type of the entity"},
                                    "observations": {
                                        "type": "array",
                                        "items": {"type": "string"},
                                        "description": "An array of observation contents associated with the entity"
                                    },
                                },
                                "required": ["name", "type", "observations"],
                            },
                        },
                    },
                    "required": ["entities"],
                },
            ),
            types.Tool(
                name="create_relations",
                description="Create multiple new relations between entities in the knowledge graph. Relations should be in active voice",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "relations": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "source": {"type": "string", "description": "The name of the entity where the relation starts"},
                                    "target": {"type": "string", "description": "The name of the entity where the relation ends"},
                                    "relationType": {"type": "string", "description": "The type of the relation"},
                                },
                                "required": ["source", "target", "relationType"],
                            },
                        },
                    },
                    "required": ["relations"],
                },
            ),
            types.Tool(
                name="add_observations",
                description="Add new observations to existing entities in the knowledge graph",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "observations": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "entityName": {"type": "string", "description": "The name of the entity to add the observations to"},
                                    "contents": {
                                        "type": "array",
                                        "items": {"type": "string"},
                                        "description": "An array of observation contents to add"
                                    },
                                },
                                "required": ["entityName", "contents"],
                            },
                        },
                    },
                    "required": ["observations"],
                },
            ),
            types.Tool(
                name="delete_entities",
                description="Delete multiple entities and their associated relations from the knowledge graph",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "entityNames": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "An array of entity names to delete"
                        },
                    },
                    "required": ["entityNames"],
                },
            ),
            types.Tool(
                name="delete_observations",
                description="Delete specific observations from entities in the knowledge graph",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "deletions": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "entityName": {"type": "string", "description": "The name of the entity containing the observations"},
                                    "observations": {
                                        "type": "array",
                                        "items": {"type": "string"},
                                        "description": "An array of observations to delete"
                                    },
                                },
                                "required": ["entityName", "observations"],
                            },
                        },
                    },
                    "required": ["deletions"],
                },
            ),
            types.Tool(
                name="delete_relations",
                description="Delete multiple relations from the knowledge graph",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "relations": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "source": {"type": "string", "description": "The name of the entity where the relation starts"},
                                    "target": {"type": "string", "description": "The name of the entity where the relation ends"},
                                    "relationType": {"type": "string", "description": "The type of the relation"},
                                },
                                "required": ["source", "target", "relationType"],
                            },
                            "description": "An array of relations to delete"
                        },
                    },
                    "required": ["relations"],
                },
            ),
            types.Tool(
                name="read_graph",
                description="Read the entire knowledge graph",
                inputSchema={
                    "type": "object",
                    "properties": {},
                },
            ),
            types.Tool(
                name="search_nodes",
                description="Search for nodes in the knowledge graph based on a query",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "The search query to match against entity names, types, and observation content"},
                    },
                    "required": ["query"],
                },
            ),
            types.Tool(
                name="find_nodes",
                description="Find specific nodes in the knowledge graph by their names",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "names": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "An array of entity names to retrieve",
                        },
                    },
                    "required": ["names"],
                },
            ),
            types.Tool(
                name="open_nodes",
                description="Open specific nodes in the knowledge graph by their names",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "names": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "An array of entity names to retrieve",
                        },
                    },
                    "required": ["names"],
                },
            ),
        ]

    @server.call_tool()
    async def handle_call_tool(
        name: str, arguments: Dict[str, Any] | None
    ) -> List[types.TextContent | types.ImageContent]:
        try:
            if name == "read_graph":
                result = await memory.read_graph()
                return [types.TextContent(type="text", text=json.dumps(result.model_dump(), indent=2))]

            if not arguments:
                raise ValueError(f"No arguments provided for tool: {name}")

            if name == "create_entities":
                entities = [Entity(**entity) for entity in arguments.get("entities", [])]
                result = await memory.create_entities(entities)
                return [types.TextContent(type="text", text=json.dumps([e.model_dump() for e in result], indent=2))]
                
            elif name == "create_relations":
                relations = [Relation(**relation) for relation in arguments.get("relations", [])]
                result = await memory.create_relations(relations)
                return [types.TextContent(type="text", text=json.dumps([r.model_dump() for r in result], indent=2))]
                
            elif name == "add_observations":
                observations = [ObservationAddition(**obs) for obs in arguments.get("observations", [])]
                result = await memory.add_observations(observations)
                return [types.TextContent(type="text", text=json.dumps(result, indent=2))]
                
            elif name == "delete_entities":
                await memory.delete_entities(arguments.get("entityNames", []))
                return [types.TextContent(type="text", text="Entities deleted successfully")]
                
            elif name == "delete_observations":
                deletions = [ObservationDeletion(**deletion) for deletion in arguments.get("deletions", [])]
                await memory.delete_observations(deletions)
                return [types.TextContent(type="text", text="Observations deleted successfully")]
                
            elif name == "delete_relations":
                relations = [Relation(**relation) for relation in arguments.get("relations", [])]
                await memory.delete_relations(relations)
                return [types.TextContent(type="text", text="Relations deleted successfully")]
                
            elif name == "search_nodes":
                result = await memory.search_nodes(arguments.get("query", ""))
                return [types.TextContent(type="text", text=json.dumps(result.model_dump(), indent=2))]
                
            elif name == "find_nodes" or name == "open_nodes":
                result = await memory.find_nodes(arguments.get("names", []))
                return [types.TextContent(type="text", text=json.dumps(result.model_dump(), indent=2))]
                
            else:
                raise ValueError(f"Unknown tool: {name}")
                
        except Exception as e:
            logger.error(f"Error handling tool call: {e}")
            return [types.TextContent(type="text", text=f"Error: {str(e)}")]

    # Start the server
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        logger.info("MCP Knowledge Graph Memory using Neo4j running on stdio")
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="mcp-neo4j-memory",
                server_version="1.1",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/tests/test_neo4j_memory_integration.py
````python
import os
import pytest
import asyncio
from neo4j import GraphDatabase
from mcp_neo4j_memory.server import Neo4jMemory, Entity, Relation, ObservationAddition, ObservationDeletion

@pytest.fixture(scope="function")
def neo4j_driver():
    """Create a Neo4j driver using environment variables for connection details."""
    uri = os.environ.get("NEO4J_URI", "neo4j://localhost:7687")
    user = os.environ.get("NEO4J_USERNAME", "neo4j")
    password = os.environ.get("NEO4J_PASSWORD", "password")
    
    driver = GraphDatabase.driver(uri, auth=(user, password))
    
    # Verify connection
    try:
        driver.verify_connectivity()
    except Exception as e:
        pytest.skip(f"Could not connect to Neo4j: {e}")
    
    yield driver
    
    # Clean up test data after tests
    driver.execute_query("MATCH (n:Memory) DETACH DELETE n")
    
    driver.close()

@pytest.fixture(scope="function")
def memory(neo4j_driver):
    """Create a Neo4jMemory instance with the Neo4j driver."""
    return Neo4jMemory(neo4j_driver)

@pytest.mark.asyncio
async def test_create_and_read_entities(memory):
    # Create test entities
    test_entities = [
        Entity(name="Alice", type="Person", observations=["Likes reading", "Works at Company X"]),
        Entity(name="Bob", type="Person", observations=["Enjoys hiking"])
    ]
    # Create entities in the graph
    created_entities = await memory.create_entities(test_entities)
    assert len(created_entities) == 2
    
    # Read the graph
    graph = await memory.read_graph()
    
    # Verify entities were created
    assert len(graph.entities) == 2
    
    # Check if entities have correct data
    entities_by_name = {entity.name: entity for entity in graph.entities}
    assert "Alice" in entities_by_name
    assert "Bob" in entities_by_name
    assert entities_by_name["Alice"].type == "Person"
    assert "Likes reading" in entities_by_name["Alice"].observations
    assert "Enjoys hiking" in entities_by_name["Bob"].observations

@pytest.mark.asyncio
async def test_create_and_read_relations(memory):
    # Create test entities
    test_entities = [
        Entity(name="Alice", type="Person", observations=[]),
        Entity(name="Bob", type="Person", observations=[])
    ]
    await memory.create_entities(test_entities)
    
    # Create test relation
    test_relations = [
        Relation(source="Alice", target="Bob", relationType="KNOWS")
    ]
    
    # Create relation in the graph
    created_relations = await memory.create_relations(test_relations)
    assert len(created_relations) == 1
    
    # Read the graph
    graph = await memory.read_graph()
    
    # Verify relation was created
    assert len(graph.relations) == 1
    relation = graph.relations[0]
    assert relation.source == "Alice"
    assert relation.target == "Bob"
    assert relation.relationType == "KNOWS"

@pytest.mark.asyncio
async def test_add_observations(memory):
    # Create test entity
    test_entity = Entity(name="Charlie", type="Person", observations=["Initial observation"])
    await memory.create_entities([test_entity])
    
    # Add observations
    observation_additions = [
        ObservationAddition(entityName="Charlie", contents=["New observation 1", "New observation 2"])
    ]
    
    result = await memory.add_observations(observation_additions)
    assert len(result) == 1
    
    # Read the graph
    graph = await memory.read_graph()
    
    # Find Charlie
    charlie = next((e for e in graph.entities if e.name == "Charlie"), None)
    assert charlie is not None
    
    # Verify observations were added
    assert "Initial observation" in charlie.observations
    assert "New observation 1" in charlie.observations
    assert "New observation 2" in charlie.observations

@pytest.mark.asyncio
async def test_delete_observations(memory):
    # Create test entity with observations
    test_entity = Entity(
        name="Dave", 
        type="Person", 
        observations=["Observation 1", "Observation 2", "Observation 3"]
    )
    await memory.create_entities([test_entity])
    
    # Delete specific observations
    observation_deletions = [
        ObservationDeletion(entityName="Dave", observations=["Observation 2"])
    ]
    
    await memory.delete_observations(observation_deletions)
    
    # Read the graph
    graph = await memory.read_graph()
    
    # Find Dave
    dave = next((e for e in graph.entities if e.name == "Dave"), None)
    assert dave is not None
    
    # Verify observation was deleted
    assert "Observation 1" in dave.observations
    assert "Observation 2" not in dave.observations
    assert "Observation 3" in dave.observations

@pytest.mark.asyncio
async def test_delete_entities(memory):
    # Create test entities
    test_entities = [
        Entity(name="Eve", type="Person", observations=[]),
        Entity(name="Frank", type="Person", observations=[])
    ]
    await memory.create_entities(test_entities)
    
    # Delete one entity
    await memory.delete_entities(["Eve"])
    
    # Read the graph
    graph = await memory.read_graph()
    
    # Verify Eve was deleted but Frank remains
    entity_names = [e.name for e in graph.entities]
    assert "Eve" not in entity_names
    assert "Frank" in entity_names

@pytest.mark.asyncio
async def test_delete_relations(memory):
    # Create test entities
    test_entities = [
        Entity(name="Grace", type="Person", observations=[]),
        Entity(name="Hank", type="Person", observations=[])
    ]
    await memory.create_entities(test_entities)
    
    # Create test relations
    test_relations = [
        Relation(source="Grace", target="Hank", relationType="KNOWS"),
        Relation(source="Grace", target="Hank", relationType="WORKS_WITH")
    ]
    await memory.create_relations(test_relations)
    
    # Delete one relation
    relations_to_delete = [
        Relation(source="Grace", target="Hank", relationType="KNOWS")
    ]
    await memory.delete_relations(relations_to_delete)
    
    # Read the graph
    graph = await memory.read_graph()
    
    # Verify only the WORKS_WITH relation remains
    assert len(graph.relations) == 1
    assert graph.relations[0].relationType == "WORKS_WITH"

@pytest.mark.asyncio
async def test_search_nodes(memory):
    # Create test entities
    test_entities = [
        Entity(name="Ian", type="Person", observations=["Likes coffee"]),
        Entity(name="Jane", type="Person", observations=["Likes tea"]),
        Entity(name="Coffee", type="Beverage", observations=["Hot drink"])
    ]
    await memory.create_entities(test_entities)
    
    # Search for coffee-related nodes
    result = await memory.search_nodes("coffee")
    
    # Verify search results
    entity_names = [e.name for e in result.entities]
    assert "Ian" in entity_names
    assert "Coffee" in entity_names
    assert "Jane" not in entity_names

@pytest.mark.asyncio
async def test_find_nodes(memory):
    # Create test entities
    test_entities = [
        Entity(name="Kevin", type="Person", observations=[]),
        Entity(name="Laura", type="Person", observations=[]),
        Entity(name="Mike", type="Person", observations=[])
    ]
    await memory.create_entities(test_entities)
    
    # Open specific nodes
    result = await memory.find_nodes(["Kevin", "Laura"])
    
    # Verify only requested nodes are returned
    entity_names = [e.name for e in result.entities]
    assert "Kevin" in entity_names
    assert "Laura" in entity_names
    assert "Mike" not in entity_names
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/.dockerignore
````
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.idea/
.vscode/
*.swp
*.swo

# Git
.git
.gitignore

# Docker
Dockerfile
.dockerignore

# Documentation
docs/
*.md
!README.md
!pyproject.toml

# Tests
tests/
test/
testing/
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/CHANGELOG.md
````markdown
## Next

### Fixed

### Changed

### Added

## v0.1.5

### Fixed
* Remove use of dynamic node labels and relationship types to be compatible with Neo4j versions < 5.26

## v0.1.4

* Create, Read, Update and Delete semantic memories
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/Dockerfile
````
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN pip install --no-cache-dir hatchling

# Copy dependency files first
COPY pyproject.toml /app/

# Install runtime dependencies
RUN pip install --no-cache-dir mcp>=0.10.0 neo4j>=5.26.0

# Copy the source code
COPY src/ /app/src/
COPY README.md /app/

# Install the package
RUN pip install --no-cache-dir -e .

# Environment variables for Neo4j connection
ENV NEO4J_URL="bolt://host.docker.internal:7687"
ENV NEO4J_USERNAME="neo4j"
ENV NEO4J_PASSWORD="password"

# Command to run the server using the package entry point
CMD ["sh", "-c", "mcp-neo4j-memory --db-url ${NEO4J_URL} --username ${NEO4J_USERNAME} --password ${NEO4J_PASSWORD}"]
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/pyproject.toml
````toml
[project]
name = "mcp-neo4j-memory"
version = "0.1.5"
description = "MCP Neo4j Knowledge Graph Memory Server"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "mcp>=0.10.0",
    "neo4j>=5.26.0",
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.uv]
dev-dependencies = [
    "pyright>=1.1.389",
    "pytest>=8.3.5",
    "pytest-asyncio>=0.25.3",
]

[project.scripts]
mcp-neo4j-memory = "mcp_neo4j_memory:main"

[tool.pytest.ini_options]
pythonpath = [
  "src"
]
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/README.md
````markdown
# 🧠🕸️ Neo4j Knowledge Graph Memory MCP Server

## 🌟 Overview

A Model Context Protocol (MCP) server implementation that provides persistent memory capabilities through Neo4j graph database integration.

By storing information in a graph structure, this server maintains complex relationships between entities as memory nodes and enables long-term retention of knowledge that can be queried and analyzed across multiple conversations or sessions.

With [Neo4j Aura](https://console.neo4j.io) you can host your own database server for free or share it with your collaborators. Otherwise you can run your own Neo4j server locally.

The MCP server leverages Neo4j's graph database capabilities to create an interconnected knowledge base that serves as an external memory system. Through Cypher queries, it allows exploration and retrieval of stored information, relationship analysis between different data points, and generation of insights from the accumulated knowledge. This memory can be further enhanced with Claude's capabilities.

### 🕸️ Graph Schema

* `Memory` - A node representing an entity with a name, type, and observations.
* `Relationship` - A relationship between two entities with a type.

### 🔍 Usage Example

```
Let's add some memories 
I, Michael, living in Dresden, Germany work at Neo4j which is headquartered in Sweden with my colleagues Andreas (Cambridge, UK) and Oskar (Gothenburg, Sweden)
I work in Product Management, Oskar in Engineering and Andreas in Developer Relations.
```

Results in Claude calling the create_entities and create_relations tools.

![](./docs/images/employee_create_entities_and_relations.png)

![](./docs/images/employee_graph.png)

## 📦 Components

### 🔧 Tools

The server offers these core tools:

#### 🔎 Query Tools
- `read_graph`
   - Read the entire knowledge graph
   - No input required
   - Returns: Complete graph with entities and relations

- `search_nodes`
   - Search for nodes based on a query
   - Input:
     - `query` (string): Search query matching names, types, observations
   - Returns: Matching subgraph

- `find_nodes`
   - Find specific nodes by name
   - Input:
     - `names` (array of strings): Entity names to retrieve
   - Returns: Subgraph with specified nodes

#### ♟️ Entity Management Tools
- `create_entities`
   - Create multiple new entities in the knowledge graph
   - Input:
     - `entities`: Array of objects with:
       - `name` (string): Name of the entity
       - `type` (string): Type of the entity  
       - `observations` (array of strings): Initial observations about the entity
   - Returns: Created entities

- `delete_entities` 
   - Delete multiple entities and their associated relations
   - Input:
     - `entityNames` (array of strings): Names of entities to delete
   - Returns: Success confirmation

#### 🔗 Relation Management Tools
- `create_relations`
   - Create multiple new relations between entities
   - Input:
     - `relations`: Array of objects with:
       - `source` (string): Name of source entity
       - `target` (string): Name of target entity
       - `relationType` (string): Type of relation
   - Returns: Created relations

- `delete_relations`
   - Delete multiple relations from the graph
   - Input:
     - `relations`: Array of objects with same schema as create_relations
   - Returns: Success confirmation

#### 📝 Observation Management Tools
- `add_observations`
   - Add new observations to existing entities
   - Input:
     - `observations`: Array of objects with:
       - `entityName` (string): Entity to add to
       - `contents` (array of strings): Observations to add
   - Returns: Added observation details

- `delete_observations`
   - Delete specific observations from entities
   - Input:
     - `deletions`: Array of objects with:
       - `entityName` (string): Entity to delete from
       - `observations` (array of strings): Observations to remove
   - Returns: Success confirmation

## 🔧 Usage with Claude Desktop

### 💾 Installation

```bash
pip install mcp-neo4j-memory
```

### ⚙️ Configuration

Add the server to your `claude_desktop_config.json` with configuration of:

```json
"mcpServers": {
  "neo4j": {
    "command": "uvx",
    "args": [
      "mcp-neo4j-memory@0.1.5",
      "--db-url",
      "neo4j+s://xxxx.databases.neo4j.io",
      "--username",
      "<your-username>",
      "--password",
      "<your-password>"
    ]
  }
}
```

Alternatively, you can set environment variables:

```json
"mcpServers": {
  "neo4j": {
    "command": "uvx",
    "args": [ "mcp-neo4j-memory@0.1.5" ],
    "env": {
      "NEO4J_URL": "neo4j+s://xxxx.databases.neo4j.io",
      "NEO4J_USERNAME": "<your-username>",
      "NEO4J_PASSWORD": "<your-password>"
    }
  }
}
```

### 🐳 Using with Docker

```json
"mcpServers": {
  "neo4j": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "-e", "NEO4J_URL=neo4j+s://xxxx.databases.neo4j.io",
      "-e", "NEO4J_USERNAME=<your-username>",
      "-e", "NEO4J_PASSWORD=<your-password>",
      "mcp/neo4j-memory:0.1.5"
    ]
  }
}
```

## 🚀 Development

### 📦 Prerequisites

1. Install `uv` (Universal Virtualenv):
```bash
# Using pip
pip install uv

# Using Homebrew on macOS
brew install uv

# Using cargo (Rust package manager)
cargo install uv
```

2. Clone the repository and set up development environment:
```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-neo4j-memory.git
cd mcp-neo4j-memory

# Create and activate virtual environment using uv
uv venv
source .venv/bin/activate  # On Unix/macOS
.venv\Scripts\activate     # On Windows

# Install dependencies including dev dependencies
uv pip install -e ".[dev]"
```

### 🐳 Docker

Build and run the Docker container:

```bash
# Build the image
docker build -t mcp/neo4j-memory:latest .

# Run the container
docker run -e NEO4J_URL="neo4j+s://xxxx.databases.neo4j.io" \
          -e NEO4J_USERNAME="your-username" \
          -e NEO4J_PASSWORD="your-password" \
          mcp/neo4j-memory:latest
```

## 📄 License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
````

## File: mcp-neo4j/servers/mcp-neo4j-memory/test.sh
````bash
export NEO4J_URI=neo4j://localhost:7687
export NEO4J_USERNAME=neo4j
export NEO4J_PASSWORD=password
uv run pytest tests/test_neo4j_memory_integration.py
````

## File: mcp-neo4j/.editorconfig
````
# Editor configuration, see http://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
````

## File: mcp-neo4j/.gitignore
````
.env
# See http://help.github.com/ignore-files/ for more about ignoring files.

# compiled output
dist
tmp
/out-tsc

# dependencies
node_modules
__pycache__
# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# python venc
.venv

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
yarn-error.log
testem.log
/typings

# System Files
.DS_Store
Thumbs.db

.nx/cache
.nx/workspace-data
__pycache__
servers/mcp-neo4j-data-modeling/test.ipynb
servers/mcp-neo4j-data-modeling/src/mcp_neo4j_data_modeling/temp.html
mcp.json
````

## File: mcp-neo4j/.prettierignore
````
# Add files here to ignore them from prettier formatting
/dist
/coverage
/.nx/cache
/.nx/workspace-data
````

## File: mcp-neo4j/.prettierrc
````
{
  "singleQuote": true
}
````

## File: mcp-neo4j/glama.json
````json
{
  "$schema": "https://glama.ai/mcp/schemas/server.json",
  "maintainers": [
    "jexp","a-s-g93","akollegger"
  ]
}
````

## File: mcp-neo4j/LICENSE.txt
````
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: mcp-neo4j/README.md
````markdown
# Neo4j MCP Clients & Servers

Model Context Protocol (MCP) is a [standardized protocol](https://modelcontextprotocol.io/introduction) for managing context between large language models (LLMs) and external systems. 

This lets you use Claude Desktop, or any other MCP Client (VS Code, Cursor, Windsurf), to use natural language to accomplish things with Neo4j and your Aura account, e.g.:

* What is in this graph?
* Render a chart from the top products sold by frequency, total and average volume
* List my instances
* Create a new instance named mcp-test for Aura Professional with 4GB and Graph Data Science enabled
* Store the fact that I worked on the Neo4j MCP Servers today with Andreas and Oskar

## Servers

### `mcp-neo4j-cypher` - natural language to Cypher queries

[Details in Readme](./servers/mcp-neo4j-cypher/)

Get database schema for a configured database and execute generated read and write Cypher queries on that database.

### `mcp-neo4j-memory` - knowledge graph memory stored in Neo4j

[Details in Readme](./servers/mcp-neo4j-memory/)

Store and retrieve entities and relationships from your personal knowledge graph in a local or remote Neo4j instance.
Access that information over different sessions, conversations, clients.

### `mcp-neo4j-cloud-aura-api` - Neo4j Aura cloud service management API

[Details in Readme](./servers/mcp-neo4j-cloud-aura-api//)

Manage your [Neo4j Aura](https://console.neo4j.io) instances directly from the comfort of your AI assistant chat.

Create and destroy instances, find instances by name, scale them up and down and enable features.

### `mcp-neo4j-data-modeling` - interactive graph data modeling and visualization

[Details in Readme](./servers/mcp-neo4j-data-modeling/)

Create, validate, and visualize Neo4j graph data models. Allows for model import/export from Arrows.app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Blog Posts

* [Everything a Developer Needs to Know About the Model Context Protocol (MCP)](https://neo4j.com/blog/developer/model-context-protocol/)
* [Claude Converses With Neo4j Via MCP - Graph Database & Analytics](https://neo4j.com/blog/developer/claude-converses-neo4j-via-mcp/)
* [Building Knowledge Graphs With Claude and Neo4j: A No-Code MCP Approach - Graph Database & Analytics](https://neo4j.com/blog/developer/knowledge-graphs-claude-neo4j-mcp/)

## License

MIT License
````

## File: ALL-GOOD-SAM-DOCS/BR1-25-1504 226c487604f481ce943afe0928cf7399.md
````markdown
# BR1-25-1504

Bond/Round: Bond Round 1
Construction Type: Ground-up new construction (e.g. a new facility or new setting being built)
Contruction: Ground up
Entity Name: Good Samaritan Hospital, A California Limited Partnership
Entity Type: For-profit Corporation
Facility Type #1: Crisis Stabilization Unit (CSU)
Facility Type #2: Psychiatric Health Facility (PHF)
Facility Type #3: Community Residential Treatment System (CRTS)/Social Rehabilitation Program (SRP)
Formula: 0.239876714283
Grant Requested: $13,340,186.06
Match Amount: $3,200,000.00
Preferred Clients List : No
Project City: Hanford
Project County: Kings
Project Name: Kings County CARE Center
Project Region: San Joaquin Valley
Region: San Joaquin Valley
Sponsor: Good Samaritan Hospital
Sponsor Name: Good Samaritan Hospital
Text: Summary:

- Project Name: Kings County CARE Center
- Match Amount: $3,200,000.00
- Grant Requested: $13,340,186.06
- Facility Type:
- Crisis Stabilization Unit (CSU)
- Psychiatric Health Facility (PHF)
- Community Residential Treatment System (CRTS)/Social Rehabilitation Program (SRP)
- Construction Type: Ground-up new construction
- Project City: Hanford
- Project County: Kings
- Project Region: San Joaquin Valley
- Entity Type: For-profit Corporation
- Sponsor: Good Samaritan Hospital
- Preferred Clients List: No
- Bond/Round: Bond Round 1
````

## File: ALL-GOOD-SAM-DOCS/BR1-25-1504_SPONSORS-DATA_UPDATED.md
````markdown
# BR1-25-1504

Bond/Round: Bond Round 1
Construction Type: Ground-up new construction (e.g. a new facility or new setting being built)
Contruction: Ground up
Entity Name: Good Samaritan Hospital, A California Limited Partnership
Entity Type: For-profit Corporation
Facility Type #1: Crisis Stabilization Unit (CSU)
Facility Type #2: Psychiatric Health Facility (PHF)
Facility Type #3: Community Residential Treatment System (CRTS)/Social Rehabilitation Program (SRP)
Grant Requested: $13,340,186.06
Match Amount: $3,200,000.00
Preferred Clients List : No
Project City: Hanford
Project County: Kings
Project Name: Kings County CARE Center
Project Region: San Joaquin Valley
Region: San Joaquin Valley
Sponsor: Good Samaritan Hospital
Sponsor Name: Good Samaritan Hospital
Text: Summary:

- Project Name: Kings County CARE Center
- Match Amount: $3,200,000.00
- Grant Requested: $13,340,186.06
- Facility Type:
- Crisis Stabilization Unit (CSU)
- Psychiatric Health Facility (PHF)
- Community Residential Treatment System (CRTS)/Social Rehabilitation Program (SRP)
- Construction Type: Ground-up new construction
- Project City: Hanford
- Project County: Kings
- Project Region: San Joaquin Valley
- Entity Type: For-profit Corporation
- Sponsor: Good Samaritan Hospital
- Preferred Clients List: No
- Bond/Round: Bond Round 1
````

## File: ALL-GOOD-SAM-DOCS/Good Sam 226c487604f480e79bd5e1221e652702.md
````markdown
# Good Sam

[BR1-25-1504_SPONSORS-DATA_UPDATED.md](Good%20Sam%20226c487604f480e79bd5e1221e652702/BR1-25-1504_SPONSORS-DATA_UPDATED.md)

[GSH Exec Dashboard - 06.16.25 - DRAFT01.pdf](Good%20Sam%20226c487604f480e79bd5e1221e652702/GSH_Exec_Dashboard_-_06.16.25_-_DRAFT01.pdf)

[GSH King's County PHF Prelim Schedule 250620.pdf](Good%20Sam%20226c487604f480e79bd5e1221e652702/GSH_Kings_County_PHF_Prelim_Schedule_250620.pdf)

[GOOD SAM.   INFO. 3.0.  Fwd_ GSH BHCIP Grants Steering Disc - 06.23.25.zip](Good%20Sam%20226c487604f480e79bd5e1221e652702/GOOD_SAM.___INFO._3.0.__Fwd__GSH_BHCIP_Grants_Steering_Disc_-_06.23.25.zip)

[GOOD SAMARITAN- ARCHITECTURE INFO. Fwd_ LPA Scope of service proposal for your review.zip](Good%20Sam%20226c487604f480e79bd5e1221e652702/GOOD_SAMARITAN-_ARCHITECTURE_INFO._Fwd__LPA_Scope_of_service_proposal_for_your_review.zip)

[BR1_1551_Kings_County_CARE_Center_Conditional_Award_Notice_Letter.pdf](Good%20Sam%20226c487604f480e79bd5e1221e652702/BR1_1551_Kings_County_CARE_Center_Conditional_Award_Notice_Letter.pdf)

[GOOD SAM info.zip](Good%20Sam%20226c487604f480e79bd5e1221e652702/GOOD_SAM_info.zip)

[GSH Exec Dashboard - 06.30.25 - DRAFT01.pdf](Good%20Sam%20226c487604f480e79bd5e1221e652702/GSH_Exec_Dashboard_-_06.30.25_-_DRAFT01.pdf)
````

## File: steps/00-noop.step.ts
````typescript
import { NoopConfig } from 'motia'

/**
 * NOOP Steps don't hold any logic in code, it's a 
 * way to connect nodes in workflow to make it comprehensive
 * like representing a man in the loop or a manual operation that can
 * happen between one step and another.
 *
 * For more information, refer to the documentation: https://www.motia.dev/docs/workbench/noop-steps
 */
export const config: NoopConfig = {
  type: 'noop',
  name: 'Flow Starter',
  description: 'Start the default flow',

  /**
   * Used mostly to connect nodes that emit to this
   */
  virtualSubscribes: [],

  /**
   * Used mostly to connect nodes that subscribes to this
   */
  virtualEmits: ['/default'],

  /**
   * The flows this step belongs to, will be available in Workbench
   */
  flows: ['default'],
}
````

## File: steps/00-noop.step.tsx
````typescript
import { BaseNode, Button, NoopNodeProps } from 'motia/workbench'
import React from 'react'

/**
 * For more information on how to override UI nodes, check documentation https://www.motia.dev/docs/workbench/ui-steps
 */
export const Node: React.FC<NoopNodeProps> = (data) => {
  const start = () => {
    fetch('/default', { method: 'POST', body: JSON.stringify({ message: 'test' }) })
  }

  return (
    <BaseNode title="Start" variant="noop" {...data} disableTargetHandle>
      <Button data-testid="start-flow-button" onClick={start}>Start Flow</Button>
    </BaseNode>
  )
}
````

## File: steps/01-api.step.ts
````typescript
import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'ApiTrigger',
  description: 'default template api trigger',

  method: 'POST',
  path: '/default',

  /**
   * This API Step emits events to topic `test-state`
   */
  emits: ['test-state'],

  /** 
   * Expected request body for type checking and documentation
   */
  bodySchema: z.object({ message: z.string() }),

  /** 
   * Expected response body for type checking and documentation
   */
  responseSchema: {
    200: z.object({ 
      message: z.string(),
      traceId: z.string(),
    })
  },

  /** 
   * We're using virtual subscribes to virtually connect noop step
   * to this step.
   *
   * Noop step is defined in noop.step.ts
   */
  virtualSubscribes: ['/default'],

  /**
   * The flows this step belongs to, will be available in Workbench
   */
  flows: ['default'],
}

export const handler: Handlers['ApiTrigger'] = async (req, { logger, emit, traceId }) => {
  /** 
   * Avoid usage of console.log, use logger instead
   */
  logger.info('Step 01 – Processing API Step', { body: req.body })

  /**
   * Emit events to the topics to process asynchronously
   */
  await emit({
    topic: 'test-state',
    data: { message: req.body.message },
  })

  /**
   * Return data back to the client
   */
  return {
    status: 200,
    body: {
      traceId,
      message: 'test-state topic emitted',
    },
  }
}
````

## File: steps/02-test-state.step.ts
````typescript
import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'SetStateChange',
  description: 'set a state change for evaluation',

  /**
   * This step subscribes to the event `test-state` to 
   * be processed asynchronously.
   */
  subscribes: ['test-state'],

  /**
   * It ultimately emits an event to `check-state-change` topic.
   */
  emits: ['check-state-change'],

  /**
   * Definition of the expected input
   */
  input: z.object({ message: z.string() }),

  /**
   * The flows this step belongs to, will be available in Workbench
   */
  flows: ['default'],
}

export const handler: Handlers['SetStateChange'] = async (input, { traceId, logger, state, emit }) => {
  /** 
   * Avoid usage of console.log, use logger instead
   */
  logger.info('Step 02 – Pushing message content to state', { input })

  const message = 'Welcome to motia!'

  /**
   * Persist content on state to be used by other steps
   * or in other workflows later
   */
  await state.set<string>(traceId, 'test', message)

  /**
   * Emit events to the topics to process separately
   * on another step
   */
  await emit({
    topic: 'check-state-change',
    data: { key: 'test', expected: message }
  })
}
````

## File: steps/03-check-state-change.step.ts
````typescript
import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'CheckStateChange',
  description: 'check state change',

  /**
   * This step subscribes to the event `check-state-change` to 
   * be processed asynchronously.
   */
  subscribes: ['check-state-change'],

  /**
   * Doesn't emit anything, which means this is a final step in a workflow
   */
  emits: [],

  /**
   * Definition of the expected input
   */
  input: z.object({ key: z.string(), expected: z.string() }),
  
  /**
   * The flows this step belongs to, will be available in Workbench
   */
  flows: ['default'],
}

export const handler: Handlers['CheckStateChange'] = async (input, { traceId, logger, state }) => {
  /** 
   * Avoid usage of console.log, use logger instead
   */
  logger.info('Step 03 – Executing CheckStateChange step', { input })

  /**
   * Fetches value from state with the given key
   */
  const value = await state.get<string>(traceId, input.key)

  if (value !== input.expected) {
    logger.error('The provided value for the state key does not match', { 
      key: input.key,
      value,
      expected: input.expected
    })
  } else {
    logger.info('The provided value matches the state value 🏁', {
      key: input.key,
      value,
    })
  }
}
````

## File: .env.notes
````
### Google Maps Platform:

---

-----
To Connect: 
export WEAVIATE_URL="mbbmk1mticwsvgngwrea.c0.us-west3.gcp.weaviate.cloud"
export WEAVIATE_API_KEY="L3Awa09BZktJWGxVMFk0ZV9lT3FTK0lsSzlvM05ITzFHUFdkUWdpaFVEbTdvS2VvMjQvNEw4cllra2pZPV92MjAw"
------
import os
import weaviate
from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)

print(client.is_ready())
-------
import weaviate, { WeaviateClient } from 'weaviate-client';

const weaviateURL = process.env.WEAVIATE_URL as string;
const weaviateApiKey = process.env.WEAVIATE_API_KEY as string;

// Best practice: store your credentials as environment variables
// WEAVIATE_URL       your Weaviate instance URL
// WEAVIATE_API_KEY   your Weaviate instance API Key

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(weaviateURL, {
    authCredentials: new weaviate.ApiKey(weaviateApiKey),
  }
)

console.log("Client is ready?", await client.isReady())


---
-----

supabase-password !!BHSME-WELLSPRING!!

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdW9vZ2J6Ym1od3FsZmtta3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTM1MzAsImV4cCI6MjA2MjE2OTUzMH0.TYkfn8JKTHIDn0iL8HpzJ-ARFmsQTsGGMpUxPD7ISVY

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdW9vZ2J6Ym1od3FsZmtta3pjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjU5MzUzMCwiZXhwIjoyMDYyMTY5NTMwfQ.NrhhArq4LtnEeSrlIwZ4C5ZhZxVV5EifuS7wpSTnoNU

JS DART
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = '[https://yluoogbzbmhwqlfkmkzc.supabase.co](https://yluoogbzbmhwqlfkmkzc.supabase.co/)'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
````

## File: .python-version
````
3.12
````

## File: docker-compose.yml
````yaml
version: '3.8'
services:
  neo4j:
    image: neo4j:5.16
    container_name: neo4j-db
    ports:
      - "7474:7474"  # HTTP
      - "7687:7687"  # Bolt
    environment:
      NEO4J_AUTH: neo4j/password
      NEO4J_PLUGINS: '["apoc"]'
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
      - neo4j_plugins:/plugins
    healthcheck:
      test: ["CMD-SHELL", "grep -q 'Bolt enabled on 0.0.0.0:7687' /logs/debug.log || exit 1"]
      interval: 5s
      timeout: 10s
      retries: 20
    restart: unless-stopped

  mcp-memory:
    image: mcp/neo4j-memory:latest
    container_name: mcp-neo4j-memory
    depends_on:
      neo4j:
        condition: service_healthy
    volumes:
      - neo4j_logs:/neo4j_logs
    environment:
      NEO4J_URL: "bolt://neo4j:7687"
      NEO4J_USERNAME: "neo4j"
      NEO4J_PASSWORD: "password"
    restart: unless-stopped

volumes:
  neo4j_data:
  neo4j_logs:
  neo4j_plugins:
````

## File: llama-motia-setup.md
````markdown
# 🚀 LlamaIndex + LlamaCloud + Motia Integration: Complete GSH Intelligence Agent

## 📋 Comprehensive Task List & Implementation Guide

Based on my research, here's your complete roadmap for building a sophisticated
GSH intelligence agent using LlamaIndex/LlamaCloud with Motia, with Weaviate as
optional backup.

---

## 🏗️ **Architecture Overview**

**Primary Stack** : Motia + LlamaCloud + LlamaIndex **Alternative Stack** :
Motia + LlamaIndex + Weaviate (if you want to keep Weaviate)

### Key Advantages of LlamaCloud over Docling:

- **Superior Document Processing** : Supports 50+ formats vs Docling's limited
  set
- **Enterprise-Grade** : Built specifically for enterprise RAG applications
- **Managed Service** : No infrastructure management needed
- **Better Performance** : Optimized parsing with Fast/Balanced/Premium modes
- **Advanced Features** : Multimodal parsing, table extraction, layout
  preservation

---

## 📊 **Cost Analysis**

### LlamaCloud Pricing:

- **Free** : 10K credits (perfect for testing)
- **Starter** : 50K credits + up to 500K pay-as-you-go ($500)
- **Pro** : 500K credits + up to 5M pay-as-you-go ($5K)
- **Enterprise** : Custom pricing with unlimited features

### Credit Usage:

- 1,000 credits = $1
- Document parsing: ~100-500 credits per document
- Index operations: ~10-50 credits per query
- Your GSH project would likely fit in Pro tier initially

---

## 🎯 **Phase 1: Foundation Setup (Day 1-2)**

### Task 1.1: Project Architecture Setup

```bash
Copy# Create enhanced Motia project
npx motia@latest create -n gsh-llamacloud-agent
cd gsh-llamacloud-agent

# Install LlamaCloud dependencies
npm install llama-cloud-services llamaindex @llamaindex/env
npm install --save-dev @types/node

# Install Motia dependencies
npm install multer express cors helmet
npm install --save-dev @types/multer @types/express @types/cors
```

### Task 1.2: Environment Configuration

```bash
Copy# .env file setup
LLAMACLOUD_API_KEY=llx-your-api-key-here
OPENAI_API_KEY=your-openai-key-here
OPENAI_MODEL=gpt-4o
LLAMACLOUD_BASE_URL=https://api.cloud.llamaindex.ai
LLAMACLOUD_PROJECT_NAME=gsh-analysis

# Optional: EU region
# LLAMACLOUD_BASE_URL=https://api.cloud.eu.llamaindex.ai

# Motia configs
DATABASE_URL=postgresql://user:password@localhost:5432/gsh_llamacloud
MAX_FILE_SIZE=52428800  # 50MB for GSH documents
UPLOAD_DIR=./uploads

# Optional: Keep Weaviate as backup
WEAVIATE_URL=http://localhost:8080
WEAVIATE_API_KEY=optional-key-here
```

### Task 1.3: Directory Structure

```
gsh-llamacloud-agent/
├── steps/
│   ├── api-steps/
│   │   ├── upload-documents.step.ts
│   │   ├── research-with-context.step.ts
│   │   └── query-documents.step.ts
│   └── event-steps/
│       ├── process-with-llamacloud.step.ts
│       ├── generate-context-queries.step.ts
│       ├── web-research.step.ts
│       └── compile-report.step.ts
├── services/
│   ├── llamacloud.service.ts
│   ├── llamaindex.service.ts
│   └── openai.service.ts
├── types/
│   └── index.ts
├── utils/
│   └── helpers.ts
└── uploads/
```

---

## 🔄 **Phase 2: Core LlamaCloud Integration (Day 3-5)**

### Task 2.1: LlamaCloud Service Implementation

```typescript
Copy; // services/llamacloud.service.ts
import { LlamaCloudIndex } from "llamaindex";
import { LlamaParse } from "llama-cloud-services";

export class LlamaCloudService {
    private llamaParse: LlamaParse;
    private apiKey: string;
    private projectName: string;

    constructor() {
        this.apiKey = process.env.LLAMACLOUD_API_KEY!;
        this.projectName = process.env.LLAMACLOUD_PROJECT_NAME!;
        this.llamaParse = new LlamaParse({
            apiKey: this.apiKey,
            resultType: "markdown", // or 'text'
            parsingInstruction:
                "Extract all content with focus on healthcare compliance, financial data, and regulatory requirements",
            verbose: true,
        });
    }

    async parseDocuments(filePaths: string[]): Promise<Document[]> {
        const documents = [];

        for (const filePath of filePaths) {
            try {
                const parsedDocument = await this.llamaParse.loadData(filePath);
                documents.push(...parsedDocument);
            } catch (error) {
                console.error(`Error parsing ${filePath}:`, error);
            }
        }

        return documents;
    }

    async createOrUpdateIndex(
        documents: Document[],
        indexName: string,
    ): Promise<LlamaCloudIndex> {
        try {
            // Try to connect to existing index
            const index = new LlamaCloudIndex({
                name: indexName,
                projectName: this.projectName,
                apiKey: this.apiKey,
            });

            // Add new documents to existing index
            await index.insert(documents);
            return index;
        } catch (error) {
            // Create new index if it doesn't exist
            return await LlamaCloudIndex.fromDocuments(
                documents,
                indexName,
                {
                    projectName: this.projectName,
                    apiKey: this.apiKey,
                },
            );
        }
    }

    async queryIndex(
        indexName: string,
        query: string,
        topK: number = 5,
    ): Promise<any[]> {
        const index = new LlamaCloudIndex({
            name: indexName,
            projectName: this.projectName,
            apiKey: this.apiKey,
        });

        const queryEngine = index.asQueryEngine();
        const response = await queryEngine.query(query);

        return response.sourceNodes || [];
    }
}
```

### Task 2.2: Document Upload API Step

```typescript
Copy; // steps/api-steps/upload-documents.step.ts
import multer from "multer";
import path from "path";
import { Request, Response } from "express";

const storage = multer.diskStorage({
    destination: process.env.UPLOAD_DIR || "./uploads",
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${
                path.extname(file.originalname)
            }`,
        );
    },
});

const upload = multer({
    storage,
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || "52428800") }, // 50MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/plain",
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"), false);
        }
    },
});

export const config = {
    type: "api",
    path: "/documents/upload",
    method: "POST",
    name: "UploadDocuments",
    emits: ["documents-uploaded"],
    flows: ["GSHDocumentProcessing"],
    middleware: [upload.array("documents", 10)],
};

export const handler = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];
        const {
            project_id = "gsh-analysis",
            index_name = "gsh-main-index",
            description = "",
            parsing_mode = "balanced", // fast, balanced, premium
        } = req.body;

        if (!files || files.length === 0) {
            return { status: 400, body: { error: "No files uploaded" } };
        }

        const batchId = `batch-${Date.now()}`;
        const uploadedFiles = files.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
        }));

        await emit("documents-uploaded", {
            batchId,
            projectId: project_id,
            indexName: index_name,
            description,
            parsingMode: parsing_mode,
            files: uploadedFiles,
            timestamp: new Date().toISOString(),
        });

        return {
            status: 200,
            body: {
                message: "Documents uploaded successfully",
                batchId,
                filesCount: uploadedFiles.length,
                files: uploadedFiles.map((f) => ({
                    name: f.originalname,
                    size: f.size,
                })),
            },
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        };
    }
};
```

### Task 2.3: LlamaCloud Document Processing Step

```typescript
Copy; // steps/event-steps/process-with-llamacloud.step.ts
import { LlamaCloudService } from "../../services/llamacloud.service";

export const config = {
    type: "event",
    subscribes: ["documents-uploaded"],
    emits: ["documents-processed-llamacloud"],
    flows: ["GSHDocumentProcessing"],
    name: "ProcessWithLlamaCloud",
};

export const handler = async (event: any) => {
    try {
        const {
            batchId,
            projectId,
            indexName,
            files,
            parsingMode,
            description,
        } = event.data;

        const llamaCloudService = new LlamaCloudService();

        // Extract file paths
        const filePaths = files.map((file: any) => file.path);

        // Parse documents with LlamaCloud
        console.log(
            `Processing ${filePaths.length} documents with LlamaCloud (${parsingMode} mode)`,
        );
        const documents = await llamaCloudService.parseDocuments(filePaths);

        // Create or update index
        const index = await llamaCloudService.createOrUpdateIndex(
            documents,
            indexName,
        );

        // Calculate processing stats
        const totalChunks = documents.length;
        const totalTokens = documents.reduce(
            (sum, doc) => sum + (doc.text?.length || 0),
            0,
        );

        await emit("documents-processed-llamacloud", {
            batchId,
            projectId,
            indexName,
            documentsProcessed: files.length,
            totalChunks,
            totalTokens,
            parsingMode,
            description,
            processedAt: new Date().toISOString(),
        });

        return {
            success: true,
            batchId,
            documentsProcessed: files.length,
            totalChunks,
            indexName,
        };
    } catch (error) {
        console.error("LlamaCloud processing error:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
```

---

## 🔍 **Phase 3: Context-Aware Research Integration (Day 6-8)**

### Task 3.1: Context-Aware Research API

```typescript
Copy; // steps/api-steps/research-with-context.step.ts
import { LlamaCloudService } from "../../services/llamacloud.service";
import { OpenAIService } from "../../services/openai.service";

export const config = {
    type: "api",
    path: "/research/context-aware",
    method: "POST",
    name: "ContextAwareResearch",
    emits: ["context-research-started"],
    flows: ["GSHResearch"],
};

export const handler = async (req: Request) => {
    try {
        const {
            query,
            projectId = "gsh-analysis",
            indexName = "gsh-main-index",
            breadth = 4,
            depth = 2,
            useDocumentContext = true,
            contextLimit = 8,
            researchMode = "comprehensive", // comprehensive, targeted, compliance-focused
        } = req.body;

        const requestId = `research-${Date.now()}-${
            Math.random().toString(36).substr(2, 9)
        }`;
        let documentContext = "";
        let contextSources = [];

        if (useDocumentContext) {
            const llamaCloudService = new LlamaCloudService();

            // Query the LlamaCloud index for relevant context
            const contextNodes = await llamaCloudService.queryIndex(
                indexName,
                query,
                contextLimit,
            );

            // Extract context and sources
            if (contextNodes.length > 0) {
                documentContext = contextNodes
                    .map((node) =>
                        `[${node.metadata?.filename || "Unknown"}] ${node.text}`
                    )
                    .join("\n\n");

                contextSources = contextNodes.map((node) => ({
                    filename: node.metadata?.filename || "Unknown",
                    relevanceScore: node.score || 0,
                    excerpt: node.text?.substring(0, 200) + "...",
                }));
            }
        }

        // Store research parameters
        await storeResearchRequest(requestId, {
            query,
            projectId,
            indexName,
            breadth,
            depth,
            documentContext,
            contextSources,
            researchMode,
            useDocumentContext,
            contextLimit,
        });

        await emit("context-research-started", {
            requestId,
            query,
            projectId,
            indexName,
            breadth,
            depth,
            documentContext,
            contextSources,
            researchMode,
            timestamp: new Date().toISOString(),
        });

        return {
            status: 200,
            body: {
                message: "Context-aware research started",
                requestId,
                contextFound: documentContext.length > 0,
                contextSourcesCount: contextSources.length,
                contextSources: contextSources.slice(0, 3), // Return top 3 sources
            },
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        };
    }
};
```

### Task 3.2: Enhanced Query Generation

```typescript
Copy; // steps/event-steps/generate-context-queries.step.ts
import { OpenAIService } from "../../services/openai.service";

export const config = {
    type: "event",
    subscribes: ["context-research-started"],
    emits: ["enhanced-queries-generated"],
    flows: ["GSHResearch"],
    name: "GenerateContextQueries",
};

export const handler = async (event: any) => {
    try {
        const {
            requestId,
            query,
            projectId,
            breadth,
            documentContext,
            researchMode,
            contextSources,
        } = event.data;

        const openaiService = new OpenAIService();

        // Create research mode specific prompts
        const researchPrompts = {
            comprehensive: `
        Generate comprehensive research queries for: ${query}
      
        DOCUMENT CONTEXT:
        ${documentContext}
      
        Focus on:
        1. Regulatory compliance (DHCS, OSHPD, BHCIP)
        2. Financial analysis and projections
        3. Timeline and implementation planning
        4. Risk assessment and mitigation
        5. Competitive landscape analysis
        6. Technical requirements and specifications
      
        Generate ${breadth} specific, actionable search queries that complement the document context.
      `,
            targeted: `
        Generate targeted research queries for: ${query}
      
        DOCUMENT CONTEXT:
        ${documentContext}
      
        Focus specifically on gaps in the document context and areas requiring external validation.
        Generate ${breadth} precise queries that address missing information.
      `,
            "compliance-focused": `
        Generate compliance-focused research queries for: ${query}
      
        DOCUMENT CONTEXT:
        ${documentContext}
      
        Focus exclusively on:
        1. Regulatory requirements and deadlines
        2. Compliance documentation needs
        3. Audit requirements
        4. Legal obligations
        5. Industry standards
      
        Generate ${breadth} compliance-specific queries.
      `,
        };

        const selectedPrompt = researchPrompts[researchMode] ||
            researchPrompts.comprehensive;

        const searchQueries = await openaiService.generateSearchQueries(
            selectedPrompt,
            breadth,
        );

        await emit("enhanced-queries-generated", {
            requestId,
            projectId,
            originalQuery: query,
            searchQueries,
            researchMode,
            contextUsed: documentContext.length > 0,
            contextSourcesCount: contextSources?.length || 0,
            timestamp: new Date().toISOString(),
        });

        return {
            success: true,
            queriesGenerated: searchQueries.length,
            researchMode,
        };
    } catch (error) {
        console.error("Error generating context queries:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
```

---

## 🌐 **Phase 4: Web Research & Analysis (Day 9-11)**

### Task 4.1: Firecrawl Integration Step

```typescript
Copy; // steps/event-steps/web-research.step.ts
import { FirecrawlService } from "../../services/firecrawl.service";

export const config = {
    type: "event",
    subscribes: ["enhanced-queries-generated"],
    emits: ["web-research-completed"],
    flows: ["GSHResearch"],
    name: "WebResearch",
};

export const handler = async (event: any) => {
    try {
        const {
            requestId,
            searchQueries,
            researchMode,
            contextSourcesCount,
        } = event.data;

        const firecrawlService = new FirecrawlService();

        // Parallel search execution with rate limiting
        const searchResults = [];
        const batchSize = 2; // Adjust based on API limits

        for (let i = 0; i < searchQueries.length; i += batchSize) {
            const batch = searchQueries.slice(i, i + batchSize);
            const batchResults = await Promise.all(
                batch.map((query) =>
                    firecrawlService.searchWithRetry(query, 5)
                ),
            );
            searchResults.push(...batchResults.flat());

            // Rate limiting delay
            if (i + batchSize < searchQueries.length) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }

        // Filter and rank results
        const filteredResults = searchResults
            .filter((result) => result.content && result.content.length > 100)
            .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
            .slice(0, 20); // Top 20 results

        await emit("web-research-completed", {
            requestId,
            searchQueries,
            searchResults: filteredResults,
            researchMode,
            contextSourcesCount,
            totalResults: filteredResults.length,
            timestamp: new Date().toISOString(),
        });

        return {
            success: true,
            totalResults: filteredResults.length,
            researchMode,
        };
    } catch (error) {
        console.error("Web research error:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
```

### Task 4.2: Comprehensive Analysis Step

```typescript
Copy; // steps/event-steps/analyze-with-context.step.ts
import { OpenAIService } from "../../services/openai.service";
import { LlamaCloudService } from "../../services/llamacloud.service";

export const config = {
    type: "event",
    subscribes: ["web-research-completed"],
    emits: ["comprehensive-analysis-completed"],
    flows: ["GSHResearch"],
    name: "AnalyzeWithContext",
};

export const handler = async (event: any) => {
    try {
        const {
            requestId,
            searchResults,
            researchMode,
            contextSourcesCount,
        } = event.data;

        // Get original research context
        const researchData = await getResearchRequest(requestId);
        const { documentContext, query, contextSources } = researchData;

        const openaiService = new OpenAIService();

        // Create analysis prompt based on research mode
        const analysisPrompt = `
      You are analyzing research results for a healthcare infrastructure project (Good Samaritan Hospital).
    
      ORIGINAL QUERY: ${query}
    
      DOCUMENT CONTEXT (${contextSourcesCount} sources):
      ${documentContext}
    
      WEB RESEARCH RESULTS:
      ${
            searchResults.map((result: any, index: number) => `
        ${index + 1}. ${result.title}
        URL: ${result.url}
        Content: ${result.content}
      `).join("\n")
        }
    
      ANALYSIS REQUIREMENTS:
      1. Synthesize web research with document context
      2. Identify key insights for healthcare project
      3. Highlight regulatory compliance considerations
      4. Assess financial implications and ROI
      5. Identify potential risks and mitigation strategies
      6. Provide actionable recommendations
      7. Identify information gaps requiring further research
    
      FOCUS AREAS:
      - DHCS/OSHPD/BHCIP compliance requirements
      - Financial projections and budget analysis
      - Timeline and implementation planning
      - Risk assessment and contingency planning
      - Competitive landscape and market positioning
    
      Provide a comprehensive analysis as a structured JSON object with:
      - executive_summary
      - key_findings (array of findings with confidence scores)
      - regulatory_analysis (compliance requirements and deadlines)
      - financial_insights (cost estimates, ROI projections)
      - risk_assessment (risks with severity and mitigation strategies)
      - recommendations (prioritized action items)
      - information_gaps (areas needing more research)
      - next_steps (immediate actions required)
    `;

        const analysis = await openaiService.generateStructuredAnalysis(
            analysisPrompt,
        );

        await emit("comprehensive-analysis-completed", {
            requestId,
            analysis,
            researchMode,
            searchResultsCount: searchResults.length,
            contextSourcesCount,
            timestamp: new Date().toISOString(),
        });

        return {
            success: true,
            analysis,
            researchMode,
        };
    } catch (error) {
        console.error("Analysis error:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
```

---

## 📊 **Phase 5: Reporting & Output (Day 12-14)**

### Task 5.1: Comprehensive Report Generation

```typescript
Copy; // steps/event-steps/compile-report.step.ts
import { OpenAIService } from "../../services/openai.service";
import { LlamaCloudService } from "../../services/llamacloud.service";

export const config = {
    type: "event",
    subscribes: ["comprehensive-analysis-completed"],
    emits: ["final-report-ready"],
    flows: ["GSHResearch"],
    name: "CompileReport",
};

export const handler = async (event: any) => {
    try {
        const {
            requestId,
            analysis,
            researchMode,
            searchResultsCount,
            contextSourcesCount,
        } = event.data;

        const researchData = await getResearchRequest(requestId);
        const { query, documentContext, contextSources } = researchData;

        const openaiService = new OpenAIService();

        // Generate executive presentation
        const reportPrompt = `
      Create a comprehensive executive research report for Good Samaritan Hospital project.
    
      RESEARCH QUERY: ${query}
      RESEARCH MODE: ${researchMode}
      SOURCES: ${contextSourcesCount} document sources, ${searchResultsCount} web sources
    
      ANALYSIS DATA:
      ${JSON.stringify(analysis, null, 2)}
    
      DOCUMENT CONTEXT SUMMARY:
      ${documentContext.substring(0, 1000)}...
    
      Create a professional executive report with:
    
      1. EXECUTIVE SUMMARY (2-3 paragraphs)
      2. PROJECT OVERVIEW
      3. KEY FINDINGS & INSIGHTS
      4. REGULATORY COMPLIANCE ANALYSIS
         - DHCS requirements and timeline
         - OSHPD approval process
         - BHCIP program compliance
      5. FINANCIAL ANALYSIS
         - Cost estimates and projections
         - ROI analysis
         - Funding requirements
      6. RISK ASSESSMENT & MITIGATION
      7. STRATEGIC RECOMMENDATIONS
      8. IMPLEMENTATION ROADMAP
      9. NEXT STEPS & ACTION ITEMS
      10. APPENDICES
          - Source documents summary
          - Research methodology
          - Assumptions and limitations
    
      Format as a comprehensive JSON structure suitable for:
      - Executive presentation
      - Board reporting
      - Stakeholder communication
      - Implementation planning
    
      Include confidence scores for key findings and recommendations.
    `;

        const report = await openaiService.generateExecutiveReport(
            reportPrompt,
        );

        // Store final report
        await storeResearchReport(requestId, {
            ...report,
            metadata: {
                projectId: researchData.projectId,
                originalQuery: query,
                researchMode,
                documentSources: contextSources,
                webSourcesCount: searchResultsCount,
                contextSourcesCount,
                completedAt: new Date().toISOString(),
                requestId,
            },
        });

        await emit("final-report-ready", {
            requestId,
            report,
            researchMode,
            totalSources: contextSourcesCount + searchResultsCount,
            timestamp: new Date().toISOString(),
        });

        return {
            success: true,
            reportGenerated: true,
            requestId,
        };
    } catch (error) {
        console.error("Report compilation error:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
```

### Task 5.2: Report Retrieval API

```typescript
Copy; // steps/api-steps/get-report.step.ts
export const config = {
    type: "api",
    path: "/research/report/:requestId",
    method: "GET",
    name: "GetReport",
    flows: ["GSHResearch"],
};

export const handler = async (req: Request) => {
    try {
        const { requestId } = req.params;
        const { format = "json" } = req.query;

        const report = await getResearchReport(requestId);

        if (!report) {
            return {
                status: 404,
                body: { error: "Report not found" },
            };
        }

        // Format response based on requested format
        if (format === "pdf") {
            // Generate PDF version (implement PDF generation)
            const pdfBuffer = await generatePDFReport(report);
            return {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition":
                        `attachment; filename="GSH-Report-${requestId}.pdf"`,
                },
                body: pdfBuffer,
            };
        } else if (format === "markdown") {
            // Generate Markdown version
            const markdownReport = await generateMarkdownReport(report);
            return {
                status: 200,
                headers: {
                    "Content-Type": "text/markdown",
                    "Content-Disposition":
                        `attachment; filename="GSH-Report-${requestId}.md"`,
                },
                body: markdownReport,
            };
        }

        return {
            status: 200,
            body: {
                requestId,
                report,
                generatedAt: report.metadata.completedAt,
                totalSources: report.metadata.contextSourcesCount +
                    report.metadata.webSourcesCount,
            },
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        };
    }
};
```

---

## 🔍 **Phase 6: Query & Management APIs (Day 15-16)**

### Task 6.1: Document Query API

```typescript
Copy; // steps/api-steps/query-documents.step.ts
import { LlamaCloudService } from "../../services/llamacloud.service";

export const config = {
    type: "api",
    path: "/documents/query",
    method: "POST",
    name: "QueryDocuments",
    flows: ["GSHQuery"],
};

export const handler = async (req: Request) => {
    try {
        const {
            query,
            indexName = "gsh-main-index",
            topK = 10,
            minScore = 0.7,
            includeMetadata = true,
        } = req.body;

        const llamaCloudService = new LlamaCloudService();

        // Query the index
        const results = await llamaCloudService.queryIndex(
            indexName,
            query,
            topK,
        );

        // Filter by minimum score
        const filteredResults = results.filter((result) =>
            (result.score || 0) >= minScore
        );

        // Format response
        const formattedResults = filteredResults.map((result) => ({
            content: result.text,
            metadata: includeMetadata ? result.metadata : undefined,
            relevanceScore: result.score || 0,
            nodeId: result.nodeId,
        }));

        return {
            status: 200,
            body: {
                query,
                indexName,
                resultsCount: formattedResults.length,
                totalResults: results.length,
                results: formattedResults,
            },
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: error.message },
        };
    }
};
```

### Task 6.2: Project Status API

```typescript
Copy// steps/api-steps/project-status.step.ts
export const config = {
  type: 'api',
  path: '/projects/:projectId/status',
  method: 'GET',
  name: 'ProjectStatus',
  flows: ['GSHProject']
};

export const handler = async (req: Request) => {
  try {
    const { projectId } = req.params;
  
    // Get project statistics
    const stats = await getProjectStats(projectId);
    const recentResearch = await getRecentResearchRequests(projectId, 5);
    const recentUploads = await getRecentUploads(projectId, 5);
  
    return {
      status: 200,
      body: {
        projectId,
        statistics: {
          totalDocuments: stats.totalDocuments,
          totalResearchRequests: stats.totalResearchRequests,
          totalCreditsUsed: stats.totalCreditsUsed,
          last
```
````

## File: main.py
````python
def main():
    print("Hello from bhsme-motia!")


if __name__ == "__main__":
    main()
````

## File: package.json
````json
{
  "name": "bhsme-motia",
  "description": "",
  "scripts": {
    "postinstall": "motia install",
    "dev": "motia dev",
    "dev:debug": "motia dev --verbose",
    "generate-types": "motia generate-types",
    "build": "motia build",
    "clean": "rm -rf dist node_modules python_modules .motia .mermaid"
  },
  "keywords": [
    "motia"
  ],
  "dependencies": {
    "motia": "^0.3.1-beta.87",
    "zod": "^3.25.74"
  },
  "devDependencies": {
    "@types/react": "^18.3.23",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.3"
  }
}
````

## File: python_packages_backup.txt
````
Python Packages Backup - Created on 2025-07-05
==============================================

This is a complete list of all Python packages installed in the virtual environment
before recreating it with Python 3.12.

Current Python version check needed before recreation.
Project requires Python >=3.12 according to pyproject.toml.

Complete package list (from uv pip freeze):
-------------------------------------------
aiohappyeyeballs==2.6.1
aiohttp==3.12.13
aiosignal==1.4.0
aiosqlite==0.21.0
annotated-types==0.7.0
anyio==4.9.0
asttokens==3.0.0
asyncpg==0.30.0
attrs==25.3.0
banks==2.1.3
beautifulsoup4==4.13.4
cachetools==5.5.2
certifi==2025.6.15
charset-normalizer==3.4.2
chromedriver-autoinstaller==0.6.4
click==8.2.1
colorama==0.4.6
contourpy==1.3.2
cssselect==1.3.0
cycler==0.12.1
dataclasses-json==0.6.7
decorator==5.2.1
defusedxml==0.7.1
deprecated==1.2.18
deprecation==2.1.0
dirtyjson==1.0.8
distro==1.9.0
docx2txt==0.9
et-xmlfile==2.0.0
executing==2.2.0
feedfinder2==0.0.4
feedparser==6.0.11
filelock==3.18.0
filetype==1.2.0
flupy==1.2.2
fonttools==4.58.5
frozenlist==1.7.0
fsspec==2025.5.1
future==1.0.0
gkeepapi==0.15.1
google-api-core==2.25.1
google-api-python-client==2.175.0
google-auth==2.40.3
google-auth-httplib2==0.2.0
google-auth-oauthlib==1.2.2
googleapis-common-protos==1.70.0
gotrue==2.12.3
gpsoauth==2.0.0
greenlet==3.2.3
griffe==1.7.3
gspread==6.2.1
h11==0.16.0
h2==4.2.0
hpack==4.1.0
html2text==2024.2.26
html5lib==1.1
httpcore==1.0.9
httplib2==0.22.0
httpx==0.28.1
hyperframe==6.1.0
idna==3.10
ipython==9.4.0
ipython-pygments-lexers==1.1.1
jedi==0.19.2
jieba3k==0.35.1
jinja2==3.1.6
jiter==0.10.0
joblib==1.5.1
kiwisolver==1.4.8
llama-cloud==0.1.30
llama-cloud-services==0.6.41
llama-index==0.12.46
llama-index-agent-openai==0.4.12
llama-index-cli==0.4.3
llama-index-core==0.12.46
llama-index-embeddings-openai==0.3.1
llama-index-indices-managed-llama-cloud==0.7.8
llama-index-instrumentation==0.2.0
llama-index-llms-openai==0.4.7
llama-index-multi-modal-llms-openai==0.5.1
llama-index-program-openai==0.3.2
llama-index-question-gen-openai==0.3.1
llama-index-readers-file==0.4.8
llama-index-readers-google==0.6.2.post1
llama-index-readers-llama-parse==0.4.0
llama-index-readers-web==0.4.3
llama-index-vector-stores-postgres==0.5.4
llama-index-vector-stores-supabase==0.3.0
llama-index-workflows==1.0.1
llama-parse==0.6.41
lxml==6.0.0
lxml-html-clean==0.4.2
markdownify==1.1.0
markupsafe==3.0.2
marshmallow==3.26.1
matplotlib==3.10.3
matplotlib-inline==0.1.7
multidict==6.6.3
mypy-extensions==1.1.0
nest-asyncio==1.6.0
networkx==3.5
newspaper3k==0.2.8
nltk==3.9.1
notion-client==2.4.0
numpy==2.3.1
oauth2client==4.1.3
oauthlib==3.3.1
openai==1.93.0
openpyxl==3.1.5
outcome==1.3.0.post0
oxylabs==2.0.0
packaging==25.0
pandas==2.3.0
parso==0.8.4
pexpect==4.9.0
pgvector==0.3.6
pillow==11.3.0
platformdirs==4.3.8
playwright==1.53.0
postgrest==1.1.1
prompt-toolkit==3.0.51
propcache==0.3.2
proto-plus==1.26.1
protobuf==6.31.1
psycopg2-binary==2.9.10
ptyprocess==0.7.0
pure-eval==0.2.3
py-readability-metrics==1.4.5
pyasn1==0.6.1
pyasn1-modules==0.4.2
pycryptodomex==3.23.0
pydantic==2.11.7
pydantic-core==2.33.2
pydrive==1.3.1
pyee==13.0.0
pygments==2.19.2
pyjwt==2.10.1
pyparsing==3.2.3
pypdf==5.7.0
pysocks==1.7.1
python-dateutil==2.9.0.post0
python-dotenv==1.1.1
pytz==2025.2
pyyaml==6.0.2
realtime==2.5.3
regex==2024.11.6
requests==2.32.4
requests-file==2.1.0
requests-oauthlib==2.0.0
rsa==4.9.1
scikit-learn==1.7.0
scipy==1.16.0
selenium==4.34.0
setuptools==80.9.0
sgmllib3k==1.0.0
six==1.17.0
sniffio==1.3.1
sortedcontainers==2.4.0
soupsieve==2.7
spider-client==0.0.27
sqlalchemy==2.0.41
stack-data==0.6.3
storage3==0.12.0
strenum==0.4.15
striprtf==0.0.26
supabase==2.16.0
supafunc==0.10.1
tenacity==9.1.2
threadpoolctl==3.6.0
tiktoken==0.9.0
tinysegmenter==0.3
tldextract==5.3.0
tqdm==4.67.1
traitlets==5.14.3
trio==0.30.0
trio-websocket==0.12.2
typing-extensions==4.14.1
typing-inspect==0.9.0
typing-inspection==0.4.1
tzdata==2025.2
uritemplate==4.2.0
urllib3==2.4.0
vecs==0.4.5
wcwidth==0.2.13
webencodings==0.5.1
websocket-client==1.8.0
websockets==15.0.1
wrapt==1.17.2
wsproto==1.2.0
yarl==1.20.1

Key dependencies identified:
---------------------------
- llama-index and related packages (AI/ML framework)
- supabase (database client)
- google-api-python-client (Google APIs)
- selenium + playwright (web automation)
- pandas, numpy, matplotlib (data analysis)
- openai (OpenAI API client)
- requests, aiohttp (HTTP clients)
- beautifulsoup4 (web scraping)
- notion-client (Notion API)
- gspread (Google Sheets API)

Project Configuration:
---------------------
- pyproject.toml shows empty dependencies array
- requirements.txt is empty
- Python version requirement: >=3.12
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "outDir": "dist",
    "rootDir": ".",
    "baseUrl": ".",
    "jsx": "react-jsx"
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "types.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "tests"
  ]
}
````

## File: types.d.ts
````typescript
/**
 * Automatically generated types for motia
 * Do NOT edit this file manually.
 * 
 * Consider adding this file to .prettierignore and eslint ignore.
 */
import { EventHandler, ApiRouteHandler, ApiResponse, MotiaStream } from 'motia'

declare module 'motia' {
  interface FlowContextStateStreams {
    
  }

  type Handlers = {
    'CheckStateChange': EventHandler<{ key: string; expected: string }, never>
    'SetStateChange': EventHandler<{ message: string }, { topic: 'check-state-change'; data: { key: string; expected: string } }>
    'ApiTrigger': ApiRouteHandler<{ message: string }, ApiResponse<200, { message: string; traceId: string }>, { topic: 'test-state'; data: { message: string } }>
  }
}
````

## File: verify_neo4j_connection.py
````python
from neo4j import GraphDatabase
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

uri = "bolt://localhost:7687"
username = "neo4j"
password = "password"

def verify_connection():
    try:
        driver = GraphDatabase.driver(uri, auth=(username, password))
        driver.verify_connectivity()
        logger.info("Successfully connected to Neo4j!")
        driver.close()
        return True
    except Exception as e:
        logger.error(f"Failed to connect to Neo4j: {e}")
        return False

if __name__ == "__main__":
    verify_connection()
````

## File: .cursor/mcp.json
````json
{
  "mcpServers": {
    "docs Docs": {
      "url": "https://gitmcp.io/www.motia.dev/docs"
    },
    "czlonkowski Docs": {
      "url": "https://gitmcp.io/github.com/czlonkowski/n8n-mcp?tab=readme-ov-file"
    },
    "brave-search": {
      "command": "env",
      "args": [
        "BRAVE_API_KEY=BSA91HObAKlxwVldV5teh4TTKGw8_qN",
        "npx",
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ]
    },
    "wcgw": {
      "command": "uv",
      "args": [
        "tool",
        "run",
        "--from",
        "wcgw@latest",
        "--python",
        "3.12",
        "wcgw_mcp"
      ]
    },
    "browser-tools": {
      "command": "npx",
      "args": ["@agentdeskai/browser-tools-mcp@1.1.0"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@suekou/mcp-notion-server"],
      "env": {
        "NOTION_API_TOKEN": "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"
      }
    },
    "mcp-server-firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-3ef9be1917704d80941a3682b89bf197"
      }
    },
    "@21st-dev/magic": {
      "command": "npx",
      "args": [
        "-y",
        "@21st-dev/magic@latest",
        "API_KEY=\"96a5dadaf33465247401cd1cfcc94dafae69c46dd90d7bbc7567559c53729abe\""
      ]
    },
    "exa": {
      "command": "node",
      "args": [
        "/Users/ojeromyo/Documents/Cline/MCP/exa-mcp-server-main/build/index.js"
      ],
      "env": {
        "EXA_API_KEY": "58a48913-19d1-46d6-bca6-624eef887ad6"
      }
    },
    "MCP_DOCKER": {
      "command": "docker",
      "args": ["mcp", "gateway", "run"],
      "type": "stdio"
    },
    "run-llama Docs": {
      "url": "https://gitmcp.io///github.com/run-llama/llama_cloud_services"
    }
  }
}
````

## File: .gitignore
````
node_modules
python_modules
.venv
venv
.motia
.mermaid
dist
*.pyc
.env
````

## File: pyproject.toml
````toml
[project]
name = "bhsme-motia"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "neo4j-graphrag>=1.8.0",
]
````

## File: requirements.txt
````
aiohappyeyeballs==2.6.1
aiohttp==3.12.13
aiosignal==1.4.0
aiosqlite==0.21.0
annotated-types==0.7.0
anyio==4.9.0
asttokens==3.0.0
asyncpg==0.30.0
attrs==25.3.0
banks==2.1.3
beautifulsoup4==4.13.4
cachetools==5.5.2
certifi==2025.6.15
charset-normalizer==3.4.2
chromedriver-autoinstaller==0.6.4
click==8.2.1
colorama==0.4.6
contourpy==1.3.2
cssselect==1.3.0
cycler==0.12.1
dataclasses-json==0.6.7
decorator==5.2.1
defusedxml==0.7.1
deprecated==1.2.18
deprecation==2.1.0
dirtyjson==1.0.8
distro==1.9.0
docx2txt==0.9
et-xmlfile==2.0.0
executing==2.2.0
feedfinder2==0.0.4
feedparser==6.0.11
filelock==3.18.0
filetype==1.2.0
flupy==1.2.2
fonttools==4.58.5
frozenlist==1.7.0
fsspec==2025.5.1
future==1.0.0
gkeepapi==0.15.1
google-api-core==2.25.1
google-api-python-client==2.175.0
google-auth==2.40.3
google-auth-httplib2==0.2.0
google-auth-oauthlib==1.2.2
googleapis-common-protos==1.70.0
gotrue==2.12.3
gpsoauth==2.0.0
greenlet==3.2.3
griffe==1.7.3
gspread==6.2.1
h11==0.16.0
h2==4.2.0
hpack==4.1.0
html2text==2024.2.26
html5lib==1.1
httpcore==1.0.9
httplib2==0.22.0
httpx==0.28.1
hyperframe==6.1.0
idna==3.10
ipython==9.4.0
ipython-pygments-lexers==1.1.1
jedi==0.19.2
jieba3k==0.35.1
jinja2==3.1.6
jiter==0.10.0
joblib==1.5.1
kiwisolver==1.4.8
llama-cloud==0.1.30
llama-cloud-services==0.6.41
llama-index==0.12.46
llama-index-agent-openai==0.4.12
llama-index-cli==0.4.3
llama-index-core==0.12.46
llama-index-embeddings-openai==0.3.1
llama-index-indices-managed-llama-cloud==0.7.8
llama-index-instrumentation==0.2.0
llama-index-llms-openai==0.4.7
llama-index-multi-modal-llms-openai==0.5.1
llama-index-program-openai==0.3.2
llama-index-question-gen-openai==0.3.1
llama-index-readers-file==0.4.8
llama-index-readers-google==0.6.2.post1
llama-index-readers-llama-parse==0.4.0
llama-index-readers-web==0.4.3
llama-index-vector-stores-postgres==0.5.4
llama-index-vector-stores-supabase==0.3.0
llama-index-workflows==1.0.1
llama-parse==0.6.41
lxml==6.0.0
lxml-html-clean==0.4.2
markdownify==1.1.0
markupsafe==3.0.2
marshmallow==3.26.1
matplotlib==3.10.3
matplotlib-inline==0.1.7
multidict==6.6.3
mypy-extensions==1.1.0
nest-asyncio==1.6.0
networkx==3.5
newspaper3k==0.2.8
nltk==3.9.1
notion-client==2.4.0
numpy==2.3.1
oauth2client==4.1.3
oauthlib==3.3.1
openai==1.93.0
openpyxl==3.1.5
outcome==1.3.0.post0
oxylabs==2.0.0
packaging==25.0
pandas==2.3.0
parso==0.8.4
pexpect==4.9.0
pgvector==0.3.6
pillow==11.3.0
platformdirs==4.3.8
playwright==1.53.0
postgrest==1.1.1
prompt-toolkit==3.0.51
propcache==0.3.2
proto-plus==1.26.1
protobuf==6.31.1
psycopg2-binary==2.9.10
ptyprocess==0.7.0
pure-eval==0.2.3
py-readability-metrics==1.4.5
pyasn1==0.6.1
pyasn1-modules==0.4.2
pycryptodomex==3.23.0
pydantic==2.11.7
pydantic-core==2.33.2
pydrive==1.3.1
pyee==13.0.0
pygments==2.19.2
pyjwt==2.10.1
pyparsing==3.2.3
pypdf==5.7.0
pysocks==1.7.1
python-dateutil==2.9.0.post0
python-dotenv==1.1.1
pytz==2025.2
pyyaml==6.0.2
realtime==2.5.3
regex==2024.11.6
requests==2.32.4
requests-file==2.1.0
requests-oauthlib==2.0.0
rsa==4.9.1
scikit-learn==1.7.0
scipy==1.16.0
selenium==4.34.0
setuptools==80.9.0
sgmllib3k==1.0.0
six==1.17.0
sniffio==1.3.1
sortedcontainers==2.4.0
soupsieve==2.7
spider-client==0.0.27
sqlalchemy==2.0.41
stack-data==0.6.3
storage3==0.12.0
strenum==0.4.15
striprtf==0.0.26
supabase==2.16.0
supafunc==0.10.1
tenacity==9.1.2
threadpoolctl==3.6.0
tiktoken==0.9.0
tinysegmenter==0.3
tldextract==5.3.0
tqdm==4.67.1
traitlets==5.14.3
trio==0.30.0
trio-websocket==0.12.2
typing-extensions==4.14.1
typing-inspect==0.9.0
typing-inspection==0.4.1
tzdata==2025.2
uritemplate==4.2.0
urllib3==2.4.0
vecs==0.4.5
wcwidth==0.2.13
webencodings==0.5.1
websocket-client==1.8.0
websockets==15.0.1
wrapt==1.17.2
wsproto==1.2.0
yarl==1.20.1
mindsdb
````
