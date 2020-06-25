abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'lightning_sites' # https://github.com/fulldecent/lightning-sites

@source_dir = '.'
@build_excludes.push('README.md','LICENSE','CONTRIBUTING.md')

desc "Perform website build"
task :build => ['jekyll:build']

desc "Perform all testing on the built HTML"
task :test do
  begin
    failed = false
        [:build, 'html:check', 'html:web_puc', 'html:check_mailto_awesome'].each do |t|
      begin
        Rake::Task[t].invoke
      rescue SystemExit => _
        failed = true
      end
    end
  end
  fail if failed
end
